import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getContestById, getContestsLoadingStatus} from '../../../store/contests/contests.reducer';
import {distinctUntilKeyChanged, filter, Observable, take, takeUntil} from 'rxjs';
import {IContest} from '../interfaces/contest.interface';
import {LoadingStatus} from '../../../shared/enums/loading-status.enum';
import {loadContest, setCurrentTask} from '../../../store/contests/contests.actions';
import {createSolution, loadSolutionByContestId} from '../../../store/solutions/solutions.actions';
import {
    getCreateSolutionLoadingStatus,
    getSolutionByUserIdAndContestId,
    getSolutionsLoadingStatus
} from '../../../store/solutions/solutions.reducer';
import {ISolution} from './interfaces/solution.interface';
import {sendTaskSolution} from '../../../store/tokens/tokens.actions';
import {IJudge0Submission} from '../../../shared/interfaces/judge0-submission.interface';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {getContestTasksSolutionsByContestId} from '../../../store/tokens/tokens.reducer';
import {IContestTaskSolution} from './interfaces/contest-task-solution.interface';
import {LOCAL_STORAGE} from '@ng-web-apis/common';
import {judge0Languages} from '../../../shared/constants/judge0-languages.const';

@Component({
    selector: 'challenge-space-contest-solution',
    templateUrl: './contest-solution.component.html',
    styleUrls: ['./contest-solution.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
})
export class ContestSolutionComponent implements OnInit {
    readonly contest$: Observable<IContest | undefined> = this.store.select(getContestById, this.selectedContestId);
    readonly contestsLoadingStatus: Observable<LoadingStatus> = this.store.pipe(select(getContestsLoadingStatus));

    readonly solution$: Observable<ISolution | undefined> = this.store.select(getSolutionByUserIdAndContestId, this.selectedContestId);
    readonly solutionsLoadingStatus$: Observable<LoadingStatus> = this.store.pipe(select(getSolutionsLoadingStatus));
    readonly createSolutionLoadingStatus$: Observable<LoadingStatus> = this.store.pipe(select(getCreateSolutionLoadingStatus));

    readonly contestTasksSolutions: Observable<IContestTaskSolution[]> = this.store.pipe(select(getContestTasksSolutionsByContestId, this.selectedContestId));

    activeItemIndex = 0;

    readonly contestSolutionForm = this.formBuilder.group({
        tasks: this.formBuilder.array([]),
        codes: this.formBuilder.array([]),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly store: Store,
        private readonly route: ActivatedRoute,
        private readonly destroy$: TuiDestroyService,
        @Inject(LOCAL_STORAGE) private readonly storage: Storage,
    ) {}

    get selectedContestId(): number {
        return Number(this.route.snapshot.params['id']);
    }

    get tasksFormArray(): FormArray {
        return this.contestSolutionForm.get('tasks') as FormArray;
    }

    get codesFormArray(): FormArray {
        return this.contestSolutionForm.get('codes') as FormArray;
    }

    get codesFormArrayControls(): FormGroup[] {
        return this.codesFormArray.controls as FormGroup[];
    }

    get tasksFormArrayControls(): FormGroup[] {
        return this.tasksFormArray.controls as FormGroup[];
    }

    ngOnInit(): void {
        this.store.dispatch(loadContest(this.selectedContestId));
        this.store.dispatch(loadSolutionByContestId(this.selectedContestId));
        this.updateContestForm();
    }

    onStartContest(): void {
        this.store.dispatch(createSolution({contestId: this.selectedContestId}));
    }

    onTasksNavigationClick(contestId: number, taskId: number): void {
        this.store.dispatch(setCurrentTask(contestId, taskId));
    }

    onSendTaskSolution({contestId, solutionId, taskId, body}: {contestId: number, solutionId: number, taskId: number, body: IJudge0Submission}): void {
        this.store.dispatch(sendTaskSolution(contestId, solutionId, taskId, body));
    }

    private updateContestForm(): void {
        this.contest$.pipe(
            filter<IContest | undefined>(Boolean),
            distinctUntilKeyChanged('id'),
            takeUntil(this.destroy$),
        ).subscribe(contest => {
            const tasks = contest.tasks.map(task => task);
            let codes = tasks.map(() => ({
                languageId: judge0Languages[0].id,
                sourceCode: '',
            }));

            this.tasksFormArray.clear();
            this.codesFormArray.clear();

            tasks.forEach(task => {
                codes = codes.map(code => ({...code, taskId: task.id}))
                this.tasksFormArray.push(this.formBuilder.group(task));
            });

            codes.forEach(code => {
                this.codesFormArray.push(this.formBuilder.group(code));
            });

            this.storage.setItem(String(this.selectedContestId), JSON.stringify(this.codesFormArray.getRawValue()));

            this.contestSolutionForm.updateValueAndValidity();
        });

        this.contestTasksSolutions.pipe(
            filter<IContestTaskSolution[]>((contestTaskSolution => Boolean(contestTaskSolution.length))),
            take(1),
        ).subscribe(contestTaskSolutions => {
            const codes = contestTaskSolutions.map(contestTasksSolutions => {
                    return this.formBuilder.group({
                        taskId: contestTasksSolutions.taskId,
                        languageId: contestTasksSolutions.result?.submissions[0]?.language_id || judge0Languages[0].id,
                        sourceCode: contestTasksSolutions.result?.submissions[0]?.source_code || '',
                    });
                }
            );

            this.codesFormArray.clear();

            codes.forEach(code => {
                this.codesFormArray.push(code);
            });

            this.storage.setItem(String(this.selectedContestId), JSON.stringify(this.codesFormArray.getRawValue()));

            this.contestSolutionForm.updateValueAndValidity();
        });
    }
}

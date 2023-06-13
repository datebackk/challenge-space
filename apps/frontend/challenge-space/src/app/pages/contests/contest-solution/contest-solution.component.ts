import {ChangeDetectionStrategy, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getContestById, getContestResults, getContestsLoadingStatus} from '../../../store/contests/contests.reducer';
import {distinctUntilKeyChanged, filter, interval, map, Observable, take, takeUntil} from 'rxjs';
import {IContest} from '../interfaces/contest.interface';
import {LoadingStatus} from '../../../shared/enums/loading-status.enum';
import {loadContest, loadContestResults, setCurrentTask} from '../../../store/contests/contests.actions';
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
import {IContestResults} from '../interfaces/contest-results.interface';
import {IUser} from '../../../shared/interfaces/user.interface';
import {getUser} from '../../../store/auth/auth.reducer';
import {isAfter, parseISO} from 'date-fns'

@Component({
    selector: 'challenge-space-contest-solution',
    templateUrl: './contest-solution.component.html',
    styleUrls: ['./contest-solution.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDestroyService],
})
export class ContestSolutionComponent implements OnInit {
    readonly contest$: Observable<IContest | undefined> = this.store.select(getContestById, this.selectedContestId);
    readonly user$: Observable<IUser | null> = this.store.pipe(select(getUser));
    readonly contestResults$: Observable<IContestResults | null> = this.store.pipe(select(getContestResults));
    readonly contestsLoadingStatus: Observable<LoadingStatus> = this.store.pipe(select(getContestsLoadingStatus));

    readonly solution$: Observable<ISolution | undefined> = this.store.select(getSolutionByUserIdAndContestId, this.selectedContestId);
    readonly solutionsLoadingStatus$: Observable<LoadingStatus> = this.store.pipe(select(getSolutionsLoadingStatus));
    readonly createSolutionLoadingStatus$: Observable<LoadingStatus> = this.store.pipe(select(getCreateSolutionLoadingStatus));

    readonly contestTasksSolutions: Observable<IContestTaskSolution[]> = this.store.pipe(select(getContestTasksSolutionsByContestId, this.selectedContestId));

    activeItemIndex = 0;
    timer$!: Observable<string>;

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
        this.store.dispatch(loadContestResults(this.selectedContestId));
        this.updateContestForm();
        this.updateTimer();
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

    canViewResults(solution: ISolution, user: IUser): boolean {
        if (solution?.completeAt || isAfter(new Date(), parseISO(solution.shouldCompleteAt))) {
            return true;
        }

        return false;
    }

    createTimer$(targetDate: string): void {
        this.timer$ = interval(1000).pipe(
            map(() => {
                const currentTime = new Date().getTime();
                const remainingTime = new Date(targetDate).getTime() - currentTime;

                const seconds = Math.floor((remainingTime / 1000) % 60);
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

                return `${days + ':'}${hours + ':'}${minutes + ':'}${seconds}`;
            }),
        );
    }

    private updateTimer(): void {
        this.solution$.pipe(
            filter<ISolution | undefined>(Boolean),
            distinctUntilKeyChanged('id'),
            takeUntil(this.destroy$),
        ).subscribe(solution => {
            this.createTimer$(solution.shouldCompleteAt);
        })
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

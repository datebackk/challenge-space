import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getContestById, getContestsLoadingStatus} from '../../../store/contests/contests.reducer';
import {distinctUntilKeyChanged, filter, Observable} from 'rxjs';
import {IContest} from '../interfaces/contest.interface';
import {LoadingStatus} from '../../../shared/enums/loading-status.enum';
import {loadContest} from '../../../store/contests/contests.actions';
import {createSolution, loadSolutionByContestId} from '../../../store/solutions/solutions.actions';
import {
    getCreateSolutionLoadingStatus,
    getSolutionByUserIdAndContestId,
    getSolutionsLoadingStatus
} from '../../../store/solutions/solutions.reducer';
import {ISolution} from './interfaces/solution.interface';
import {sendTaskSolution} from '../../../store/tokens/tokens.actions';
import {IJudge0Submission} from '../../../shared/interfaces/judge0-submission.interface';

@Component({
    selector: 'challenge-space-contest-solution',
    templateUrl: './contest-solution.component.html',
    styleUrls: ['./contest-solution.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestSolutionComponent implements OnInit {
    readonly contest$: Observable<IContest | undefined> = this.store.select(getContestById, this.selectedContestId);
    readonly contestsLoadingStatus: Observable<LoadingStatus> = this.store.pipe(select(getContestsLoadingStatus));

    readonly solution$: Observable<ISolution | undefined> = this.store.select(getSolutionByUserIdAndContestId, this.selectedContestId);
    readonly solutionsLoadingStatus$: Observable<LoadingStatus> = this.store.pipe(select(getSolutionsLoadingStatus));
    readonly createSolutionLoadingStatus$: Observable<LoadingStatus> = this.store.pipe(select(getCreateSolutionLoadingStatus));



    activeItemIndex = 0;

    readonly contestSolutionForm = this.formBuilder.group({
        tasks: this.formBuilder.array([]),
    });

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly store: Store,
        private readonly route: ActivatedRoute,
    ) {}

    get selectedContestId(): number {
        return Number(this.route.snapshot.params['id']);
    }

    get tasksFormArray(): FormArray {
        return this.contestSolutionForm.get('tasks') as FormArray;
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

    onSendTaskSolution({solutionId, taskId, body}: {solutionId: number, taskId: number, body: IJudge0Submission}): void {
        this.store.dispatch(sendTaskSolution(solutionId, taskId, body));
    }

    private updateContestForm(): void {
        this.contest$.pipe(
            filter<IContest | undefined>(Boolean),
            distinctUntilKeyChanged('id'),
        ).subscribe(contest => {
            const tasks = contest.tasks.map(task => this.formBuilder.group(task))

            this.tasksFormArray.clear();

            tasks.forEach(task => {
                this.tasksFormArray.push(task);
            })
        });
    }
}

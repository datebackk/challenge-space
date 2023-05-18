import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {getContestById, getContestsLoadingStatus} from '../../../store/contests/contests.reducer';
import {Observable} from 'rxjs';
import {IContest} from '../interfaces/contest.interface';
import {LoadingStatus} from '../../../shared/enums/loading-status.enum';

@Component({
    selector: 'challenge-space-contest-solution',
    templateUrl: './contest-solution.component.html',
    styleUrls: ['./contest-solution.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestSolutionComponent implements OnInit {
    readonly contest$: Observable<IContest | undefined> = this.store.select(getContestById, this.selectedContestId);
    readonly contestsLoadingStatus: Observable<LoadingStatus> = this.store.pipe(select(getContestsLoadingStatus));

    activeItemIndex = 0;

    readonly contestSolutionForm = this.formBuilder.group({
        mainSettings: this.formBuilder.group({}),
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
    }
}

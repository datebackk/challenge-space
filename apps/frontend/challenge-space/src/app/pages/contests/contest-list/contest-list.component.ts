import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {loadContests} from '../../../store/contests/contests.actions';
import {Observable} from 'rxjs';
import {IContest} from '../interfaces/contest.interface';
import {getContests} from '../../../store/contests/contests.reducer';

@Component({
    selector: 'challenge-space-contest-list',
    templateUrl: './contest-list.component.html',
    styleUrls: ['./contest-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestListComponent implements OnInit {
    readonly contests$: Observable<IContest[]> = this.store.pipe(select(getContests));
    constructor(private readonly store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(loadContests());
    }
}

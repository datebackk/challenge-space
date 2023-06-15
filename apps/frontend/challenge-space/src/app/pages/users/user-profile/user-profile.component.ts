import {ChangeDetectionStrategy, Component} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {IUser} from '../../../shared/interfaces/user.interface';
import {getUser} from '../../../store/auth/auth.reducer';
import {getContestsByUserId} from '../../../store/contests/contests.reducer';
import {getSolutionByUserId} from '../../../store/solutions/solutions.reducer';
import {ISolution} from '../../contests/contest-solution/interfaces/solution.interface';
import {IContest} from '../../contests/interfaces/contest.interface';

@Component({
    selector: 'challenge-space-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent {
    readonly user$: Observable<IUser | null> = this.store.pipe(select(getUser));
    readonly myContests$: Observable<IContest[]> = this.store.pipe(select(getContestsByUserId));
    readonly contestsParticipated$: Observable<ISolution | undefined> = this.store.pipe(select(getSolutionByUserId));
    constructor(private readonly store: Store) {}
}

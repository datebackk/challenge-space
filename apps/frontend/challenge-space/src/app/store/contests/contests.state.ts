import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {IContest} from '../../pages/contests/interfaces/contest.interface';

export interface IContestsState extends EntityState<IContest> {
    loadingStatus: LoadingStatus;
    createLoadingStatus: LoadingStatus;
}

export const contestsAdapter = createEntityAdapter<IContest>({})

export const contestsInitialState: IContestsState = contestsAdapter.getInitialState({
    loadingStatus: LoadingStatus.Success,
    createLoadingStatus: LoadingStatus.Success,
});

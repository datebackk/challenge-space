import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {IContest} from '../../pages/contests/interfaces/contest.interface';
import {IContestTask} from '../../pages/contests/interfaces/contest-task.interface';

export interface IContestsState extends EntityState<IContest> {
    currentTask: IContestTask | null;
    loadingStatus: LoadingStatus;
    createLoadingStatus: LoadingStatus;
}

export const contestsAdapter = createEntityAdapter<IContest>({})

export const contestsInitialState: IContestsState = contestsAdapter.getInitialState({
    currentTask: null,
    loadingStatus: LoadingStatus.Success,
    createLoadingStatus: LoadingStatus.Success,
});

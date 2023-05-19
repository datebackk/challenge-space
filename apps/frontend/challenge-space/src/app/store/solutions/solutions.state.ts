import {createEntityAdapter, EntityState} from '@ngrx/entity';

import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';
import {LoadingStatus} from '../../shared/enums/loading-status.enum';

export interface ISolutionsState extends EntityState<ISolution> {
    loadingStatus: LoadingStatus;
    createLoadingStatus: LoadingStatus;
}

export const solutionsAdapter = createEntityAdapter<ISolution>({});

export const solutionsInitialState: ISolutionsState = solutionsAdapter.getInitialState({
    loadingStatus: LoadingStatus.Success,
    createLoadingStatus: LoadingStatus.Success,
});

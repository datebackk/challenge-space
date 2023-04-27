import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {createContest, createContestError, createContestSuccess} from './contests.actions';
import {contestsInitialState, IContestsState} from './contests.state';

export const CONTESTS_FEATURE = 'contests';

export const contestsReducer = createReducer(
    contestsInitialState,
    on(createContest, state => ({
        ...state,
        createLoadingStatus: LoadingStatus.Loading,
    })),
    on(createContestSuccess, state => ({
        ...state,
        createLoadingStatus: LoadingStatus.Success,
    })),
    on(createContestError, state => ({
        ...state,
        createLoadingStatus: LoadingStatus.Error,
    })),
);

const contestsFeatureSelector = createFeatureSelector<IContestsState>(CONTESTS_FEATURE);

export const getCreateContestLoadingStatus = createSelector(
    contestsFeatureSelector,
    state => state.createLoadingStatus,
);

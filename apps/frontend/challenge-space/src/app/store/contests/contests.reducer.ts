import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {
    createContest,
    createContestError,
    createContestSuccess,
    loadContests, loadContestsError,
    loadContestsSuccess
} from './contests.actions';
import {contestsAdapter, contestsInitialState, IContestsState} from './contests.state';
import {Dictionary} from '@ngrx/entity';
import {IContest} from '../../pages/contests/interfaces/contest.interface';

export const CONTESTS_FEATURE = 'contests';

export const contestsReducer = createReducer(
    contestsInitialState,
    on(loadContests, state => ({
        ...state,
        loadingStatus: LoadingStatus.Loading,
    })),
    on(loadContestsSuccess, (state, {contests}) =>
        contestsAdapter.setAll(contests, {
            ...state,
            loadingStatus: LoadingStatus.Success,
        })
    ),
    on(loadContestsError, state => ({
        ...state,
        loadingStatus: LoadingStatus.Error,
    })),
    on(createContest, state => ({
        ...state,
        createLoadingStatus: LoadingStatus.Loading,
    })),
    on(createContestSuccess, (state, {contest}) =>
        contestsAdapter.addOne(contest, {
            ...state,
            createLoadingStatus: LoadingStatus.Success,
        })
    ),
    on(createContestError, state => ({
        ...state,
        createLoadingStatus: LoadingStatus.Error,
    })),
);

const contestsFeatureSelector = createFeatureSelector<IContestsState>(CONTESTS_FEATURE);

export const {selectAll: getContests, selectEntities: getContestsEntities} = contestsAdapter.getSelectors(contestsFeatureSelector);

export const getContestById = createSelector(
    getContestsEntities,
    (entities: Dictionary<IContest>, id: number) => entities[id]
);

export const getContestsLoadingStatus = createSelector(
    contestsFeatureSelector,
    (state: IContestsState) => state.loadingStatus,
);

export const getCreateContestLoadingStatus = createSelector(
    contestsFeatureSelector,
    state => state.createLoadingStatus,
);

import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {
    createContest,
    createContestError,
    createContestSuccess, loadContestResults, loadContestResultsSuccess,
    loadContests, loadContestsError,
    loadContestsSuccess, loadContestSuccess, setCurrentTask
} from './contests.actions';
import {contestsAdapter, contestsInitialState, IContestsState} from './contests.state';
import {Dictionary} from '@ngrx/entity';
import {IContest} from '../../pages/contests/interfaces/contest.interface';
import {getUser} from '../auth/auth.reducer';
import {IUser} from '../../shared/interfaces/user.interface';

export const CONTESTS_FEATURE = 'contests';

export const contestsReducer = createReducer(
    contestsInitialState,
    on(setCurrentTask, (state, {contestId, taskId}) => ({
        ...state,
        currentTask: state.entities[contestId]?.tasks.find(task => task.id === taskId) || null,
    })),
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
    on(loadContestSuccess, (state, {contest}) =>
        contestsAdapter.upsertOne(contest, {
            ...state
        }),
    ),
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
    on(loadContestResults, (state) => ({
        ...state,
        results: null,
    })),
    on(loadContestResultsSuccess, (state, {results}) => ({
        ...state,
        results,
    })),
);

const contestsFeatureSelector = createFeatureSelector<IContestsState>(CONTESTS_FEATURE);

export const {selectAll: getContests, selectEntities: getContestsEntities} = contestsAdapter.getSelectors(contestsFeatureSelector);

export const getContestById = createSelector(
    getContestsEntities,
    (entities: Dictionary<IContest>, id: number) => entities[id]
);

export const getContestsByUserId = createSelector(
    getContests,
    getUser,
    // @ts-ignore
    (contests: IContest[], user: IUser | null) => contests.filter(contest.user.id === user.id),
);

export const getCurrentContestTask = createSelector(
    contestsFeatureSelector,
    (state: IContestsState) => state.currentTask
);

export const getContestsLoadingStatus = createSelector(
    contestsFeatureSelector,
    (state: IContestsState) => state.loadingStatus,
);

export const getCreateContestLoadingStatus = createSelector(
    contestsFeatureSelector,
    state => state.createLoadingStatus,
);

export const getContestResults = createSelector(
    contestsFeatureSelector,
    state => state.results,
);

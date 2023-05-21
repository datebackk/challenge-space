import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {
    createSolution,
    createSolutionError,
    createSolutionSuccess, loadSolutionSuccess,
} from './solutions.actions';
import {
    ISolutionsState,
    solutionsAdapter,
    solutionsInitialState,
} from './solutions.state';
import {Dictionary} from '@ngrx/entity';
import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';
import {getUser} from '../auth/auth.reducer';
import {IUser} from '../../shared/interfaces/user.interface';

export const SOLUTIONS_FEATURE = 'solutions';

export const solutionsReducer = createReducer(
    solutionsInitialState,
    on(loadSolutionSuccess, (state, {solution}) =>
        solutionsAdapter.upsertOne(solution, {
            ...state
        }),
    ),
    on(createSolution, state => ({
        ...state,
        createLoadingStatus: LoadingStatus.Loading,
    })),
    on(createSolutionSuccess, (state, {solution}) =>
        solutionsAdapter.upsertOne(solution, {
            ...state,
            createLoadingStatus: LoadingStatus.Success,
        }),
    ),
    on(createSolutionError, state => ({
        ...state,
        createLoadingStatus: LoadingStatus.Error,
    })),
);

const solutionsFeatureSelector =
    createFeatureSelector<ISolutionsState>(SOLUTIONS_FEATURE);


export const {selectAll: getSolutions, selectEntities: getSolutionsEntities} = solutionsAdapter.getSelectors(solutionsFeatureSelector);

export const getSolutionByUserIdAndContestId = createSelector(
    getSolutions,
    getUser,
    (solutions: ISolution[], user: IUser | null, contestId: number) => solutions.find(solution => solution.user.id === user?.id && solution.contest.id === contestId)
);

export const getSolutionsLoadingStatus = createSelector(
    solutionsFeatureSelector,
    (state: ISolutionsState) => state.loadingStatus,
);

export const getCreateSolutionLoadingStatus = createSelector(
    solutionsFeatureSelector,
    state => state.createLoadingStatus,
);
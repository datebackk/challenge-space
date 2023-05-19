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
        solutionsAdapter.addOne(solution, {
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

export const getSolutionById = createSelector(
    getSolutionsEntities,
    (entities: Dictionary<ISolution>, id: number) => entities[id]
);

export const getSolutionsLoadingStatus = createSelector(
    solutionsFeatureSelector,
    (state: ISolutionsState) => state.loadingStatus,
);

export const getCreateSolutionLoadingStatus = createSelector(
    solutionsFeatureSelector,
    state => state.createLoadingStatus,
);

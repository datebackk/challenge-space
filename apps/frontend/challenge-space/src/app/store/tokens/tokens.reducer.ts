import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {ITokensState, tokenInitialState, tokensAdapter} from './tokens.state';
import {loadTaskSolutionsSuccess} from './tokens.actions';
import {IContestTaskSolution} from '../../pages/contests/contest-solution/interfaces/contest-task-solution.interface';

export const TOKENS_FEATURE = 'tokens';

export const tokensReducer = createReducer(
    tokenInitialState,
    on(loadTaskSolutionsSuccess, (state, {solutionId, taskId, result}) =>
        tokensAdapter.upsertOne({solutionId, taskId, result}, {
            ...state
        }),
    ),
);

export const tokensFeatureSelector = createFeatureSelector<ITokensState>(TOKENS_FEATURE);

export const {selectAll: getTasksSolutions, selectEntities: getTasksSolutionsEntities} = tokensAdapter.getSelectors(tokensFeatureSelector);

export const getTaskSolutionByTaskId = createSelector(
    getTasksSolutions,
    (taskSolutions: IContestTaskSolution[], taskId: number) => taskSolutions.find(taskSolution => taskSolution.taskId === taskId)
);



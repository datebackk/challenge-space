import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';
import {ITokensState, tokenInitialState, tokensAdapter} from './tokens.state';
import {loadTaskSolutionsSuccess} from './tokens.actions';
import {IContestTaskSolution} from '../../pages/contests/contest-solution/interfaces/contest-task-solution.interface';
import {getCurrentContestTask} from '../contests/contests.reducer';
import {IContestTask} from '../../pages/contests/interfaces/contest-task.interface';

export const TOKENS_FEATURE = 'tokens';

export const tokensReducer = createReducer(
    tokenInitialState,
    on(loadTaskSolutionsSuccess, (state, {contestTaskSolution}) =>
        tokensAdapter.upsertOne(contestTaskSolution, {
            ...state
        }),
    ),
);

export const tokensFeatureSelector = createFeatureSelector<ITokensState>(TOKENS_FEATURE);

export const {selectAll: getTasksSolutions, selectEntities: getTasksSolutionsEntities} = tokensAdapter.getSelectors(tokensFeatureSelector);

export const getTaskSolutionByTaskId = createSelector(
    getTasksSolutions,
    getCurrentContestTask,
    (taskSolutions: IContestTaskSolution[], contestTask: IContestTask | null) =>
        taskSolutions.find(taskSolution => taskSolution.taskId === contestTask?.id)
);



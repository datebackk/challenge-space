import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import {IContestTaskSolution} from '../../pages/contests/contest-solution/interfaces/contest-task-solution.interface';
import {IContestTask} from '../../pages/contests/interfaces/contest-task.interface';
import {judge0SubmissionWaitingStatuses} from '../../shared/constants/judge0-submission-waiting-statuses.const';
import {getCurrentContestTask} from '../contests/contests.reducer';
import {loadTaskSolutionsSuccess, sendTaskSolution} from './tokens.actions';
import {ITokensState, tokenInitialState, tokensAdapter} from './tokens.state';

export const TOKENS_FEATURE = 'tokens';

export const tokensReducer = createReducer(
    tokenInitialState,
    on(sendTaskSolution, (state, {taskId}) =>
        tokensAdapter.mapOne(
            {
                id: taskId,
                map: entity => ({...entity, isFullLoaded: false}),
            },
            state,
        ),
    ),
    on(loadTaskSolutionsSuccess, (state, {contestTaskSolution}) =>
        tokensAdapter.upsertOne(
            {
                ...contestTaskSolution,
                isFullLoaded: !contestTaskSolution.result.submissions.some(
                    contestTaskSolution =>
                        (
                            (
                                // @ts-ignore
                                contestTaskSolution.status.id in
                                judge0SubmissionWaitingStatuses
                            )
                        ),
                ),
            },
            {
                ...state,
            },
        ),
    ),
);

export const tokensFeatureSelector = createFeatureSelector<ITokensState>(TOKENS_FEATURE);

export const {selectAll: getTasksSolutions, selectEntities: getTasksSolutionsEntities} =
    tokensAdapter.getSelectors(tokensFeatureSelector);

export const getTaskSolutionByTaskId = createSelector(
    getTasksSolutions,
    getCurrentContestTask,
    (taskSolutions: IContestTaskSolution[], contestTask: IContestTask | null) =>
        taskSolutions.find(taskSolution => taskSolution.taskId === contestTask?.id),
);

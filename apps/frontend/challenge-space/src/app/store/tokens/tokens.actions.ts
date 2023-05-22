import {createAction} from '@ngrx/store';

import {IContestTaskSolution} from '../../pages/contests/contest-solution/interfaces/contest-task-solution.interface';
import {IJudge0Submission} from '../../shared/interfaces/judge0-submission.interface';

enum TokensActions {
    sendTaskSolution = '[Tokens] send task solution',
    loadTaskSolutions = '[Tokens] load task solutions',
    loadTaskSolutionsSuccess = '[Tokens] load task solutions success',
    loadTaskSolutionsError = '[Tokens] load task solutions error',
}

export const sendTaskSolution = createAction(
    TokensActions.sendTaskSolution,
    (solutionId: number, taskId: number, body: IJudge0Submission) => ({
        solutionId,
        taskId,
        body,
    }),
);

export const loadTaskSolutions = createAction(
    TokensActions.loadTaskSolutions,
    (solutionId: number, taskId: number) => ({solutionId, taskId}),
);

export const loadTaskSolutionsSuccess = createAction(
    TokensActions.loadTaskSolutionsSuccess,
    (contestTaskSolution: IContestTaskSolution) => ({contestTaskSolution}),
);

export const loadTaskSolutionsError = createAction(TokensActions.loadTaskSolutionsError);

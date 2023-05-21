import {createAction} from '@ngrx/store';
import {IJudge0BatchedResponse} from '../../shared/interfaces/judge0-batched-response.interface';
import {IJudge0Submission} from '../../shared/interfaces/judge0-submission.interface';

enum TokensActions {
    sendTaskSolution = '[Tokens] send task solution',
    loadTaskSolutions = '[Tokens] load task solutions',
    loadTaskSolutionsSuccess = '[Tokens] load task solutions success',
    loadTaskSolutionsError = '[Tokens] load task solutions error'
}

export const sendTaskSolution = createAction(
    TokensActions.sendTaskSolution,
    (solutionId: number, taskId: number, body: IJudge0Submission) => ({solutionId, taskId, body})
);

export const loadTaskSolutions = createAction(
    TokensActions.loadTaskSolutions,
    (solutionId: number, taskId: number) => ({solutionId, taskId})
);

export const loadTaskSolutionsSuccess = createAction(
    TokensActions.loadTaskSolutionsSuccess,
    (solutionId: number, taskId: number, result: IJudge0BatchedResponse) => ({solutionId, taskId, result})
);

export const loadTaskSolutionsError = createAction(
    TokensActions.loadTaskSolutionsError,
);

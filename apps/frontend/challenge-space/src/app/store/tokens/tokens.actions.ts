import {createAction} from '@ngrx/store';

import {IContestTaskSolution} from '../../pages/contests/contest-solution/interfaces/contest-task-solution.interface';
import {IJudge0Submission} from '../../shared/interfaces/judge0-submission.interface';

enum TokensActions {
    SendTaskSolution = '[Tokens] send task solution',
    LoadContestSolutions = '[Tokens] load contest solutions',
    LoadContestSolutionsSuccess = '[Tokens] load contest solutions success',
    LoadTaskSolutions = '[Tokens] load task solutions',
    LoadTaskSolutionsSuccess = '[Tokens] load task solutions success',
    LoadTaskSolutionsError = '[Tokens] load task solutions error',
}

export const sendTaskSolution = createAction(
    TokensActions.SendTaskSolution,
    (solutionId: number, taskId: number, body: IJudge0Submission) => ({
        solutionId,
        taskId,
        body,
    }),
);

export const loadContestSolutions = createAction(
    TokensActions.LoadContestSolutions,
    (solutionId: number) => ({solutionId}),
)

export const loadContestSolutionsSuccess = createAction(
    TokensActions.LoadContestSolutionsSuccess,
    (contestTasksSolutions: IContestTaskSolution[]) => ({contestTasksSolutions}),
)

export const loadTaskSolutions = createAction(
    TokensActions.LoadTaskSolutions,
    (solutionId: number, taskId: number) => ({solutionId, taskId}),
);

export const loadTaskSolutionsSuccess = createAction(
    TokensActions.LoadTaskSolutionsSuccess,
    (contestTaskSolution: IContestTaskSolution) => ({contestTaskSolution}),
);

export const loadTaskSolutionsError = createAction(TokensActions.LoadTaskSolutionsError);

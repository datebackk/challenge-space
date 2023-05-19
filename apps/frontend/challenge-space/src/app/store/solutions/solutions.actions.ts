import {createAction} from '@ngrx/store';

import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';

enum SolutionsActions {
    LoadSolution = '[Solutions] load solution',
    LoadSolutionSuccess = '[Solutions] load solution success',
    LoadSolutionError = '[Solutions] load solution error',
    CreateSolution = '[Solutions] create solution',
    CreateSolutionSuccess = '[Solutions] create solution success',
    CreateSolutionError = '[Solutions] create solution error',
}

export const loadSolution = createAction(
    SolutionsActions.LoadSolution,
    (id: number) => ({id}),
);

export const loadSolutionSuccess = createAction(
    SolutionsActions.LoadSolutionSuccess,
    (solution: ISolution) => ({solution}),
);

export const loadSolutionError = createAction(
    SolutionsActions.LoadSolutionError,
);

export const createSolution = createAction(
    SolutionsActions.CreateSolution,
    (solution: ISolution) => ({solution}),
);

export const createSolutionSuccess = createAction(
    SolutionsActions.CreateSolutionSuccess,
    (solution: ISolution) => ({solution}),
);

export const createSolutionError = createAction(SolutionsActions.CreateSolutionError);

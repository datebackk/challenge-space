import {createAction} from '@ngrx/store';

import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';
import {ISolutionWithoutId} from '../../pages/contests/contest-solution/interfaces/solution-without-id.interface';

enum SolutionsActions {
    LoadSolutionById = '[Solutions] load solution by id',
    LoadSolutionByContestId = '[Solutions] load solution by id',
    LoadSolutionSuccess = '[Solutions] load solution success',
    LoadSolutionError = '[Solutions] load solution error',
    CreateSolution = '[Solutions] create solution',
    CreateSolutionSuccess = '[Solutions] create solution success',
    CreateSolutionError = '[Solutions] create solution error',
}

export const loadSolutionById = createAction(
    SolutionsActions.LoadSolutionById,
    (id: number) => ({id}),
);

export const loadSolutionByContestId = createAction(
    SolutionsActions.LoadSolutionById,
    (contestId: number) => ({contestId}),
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
    (solution: ISolutionWithoutId) => ({solution}),
);

export const createSolutionSuccess = createAction(
    SolutionsActions.CreateSolutionSuccess,
    (solution: ISolution) => ({solution}),
);

export const createSolutionError = createAction(SolutionsActions.CreateSolutionError);

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';

import {SolutionsApiService} from '../../api/solutions/solutions.api.service';
import {
    loadContestSolutions, loadContestSolutionsSuccess,
    loadTaskSolutions,
    loadTaskSolutionsError,
    loadTaskSolutionsSuccess,
    sendTaskSolution,
} from './tokens.actions';

@Injectable()
export class TokensEffects {
    loadTaskSolution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTaskSolutions),
            switchMap(({solutionId, taskId}) =>
                this.solutionsApiService.getSolutionTaskResults(solutionId, taskId).pipe(
                    map(contestTaskSolution =>
                        loadTaskSolutionsSuccess(contestTaskSolution),
                    ),
                    catchError(() => of(loadTaskSolutionsError)),
                ),
            ),
        ),
    );

    loadContestTasksSolution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContestSolutions),
            switchMap(({contestId, solutionId}) =>
                this.solutionsApiService.getSolutionTasksResults(contestId, solutionId).pipe(
                    map(contestTaskSolution =>
                        loadContestSolutionsSuccess(contestTaskSolution),
                    ),
                    catchError(() => of(loadTaskSolutionsError)),
                ),
            ),
        ),
    );

    sendTaskSolution$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(sendTaskSolution),
                switchMap(({contestId, solutionId, taskId, body}) =>
                    this.solutionsApiService.submitTaskSolution(contestId, solutionId, taskId, body),
                ),
            ),
        {dispatch: false},
    );

    constructor(
        private readonly actions$: Actions,
        private readonly solutionsApiService: SolutionsApiService,
    ) {}
}

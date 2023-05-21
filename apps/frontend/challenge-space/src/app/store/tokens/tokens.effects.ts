import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {loadTaskSolutions, loadTaskSolutionsError, loadTaskSolutionsSuccess, sendTaskSolution} from './tokens.actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {SolutionsApiService} from '../../api/solutions/solutions.api.service';

@Injectable()
export class TokensEffects {
    loadTaskSolution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTaskSolutions),
            switchMap(({solutionId, taskId}) =>
                this.solutionsApiService.getSolutionTaskResults(solutionId, taskId).pipe(
                    map((result) => loadTaskSolutionsSuccess(solutionId, taskId, result)),
                    catchError(() => of(loadTaskSolutionsError)),
                )
            ),
        )
    );

    sendTaskSolution = createEffect(() =>
        this.actions$.pipe(
            ofType(sendTaskSolution),
            switchMap(({solutionId, taskId, body}) =>
                this.solutionsApiService.submitTaskSolution(solutionId, taskId, body)
            ),
        ),
        {dispatch: false}
    );

    constructor(
        private readonly actions$: Actions,
        private readonly solutionsApiService: SolutionsApiService,
    ) {}
}

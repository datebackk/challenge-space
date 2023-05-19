import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SolutionsApiService} from '../../api/solutions/solutions.api.service';
import {createSolution, createSolutionSuccess, loadSolutionByContestId, loadSolutionSuccess} from './solutions.actions';
import {map, switchMap} from 'rxjs';

@Injectable()
export class SolutionsEffects {
    loadSolutionByContestId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSolutionByContestId),
            switchMap(({contestId}) =>
                this.solutionsApiService.getSolutionByContestId(contestId).pipe(
                    map((solution) => loadSolutionSuccess(solution))
                )
            )
        )
    );

    createSolution$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createSolution),
            switchMap(({solution}) =>
                this.solutionsApiService.createSolution(solution).pipe(
                    map((solution) => createSolutionSuccess(solution))
                )
            )
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly solutionsApiService: SolutionsApiService,
    ) {}
}

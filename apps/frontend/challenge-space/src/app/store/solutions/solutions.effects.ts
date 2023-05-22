import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {SolutionsApiService} from '../../api/solutions/solutions.api.service';
import {createSolution, createSolutionSuccess, loadSolutionByContestId, loadSolutionSuccess} from './solutions.actions';
import {filter, map, mergeMap, switchMap} from 'rxjs';
import {loadContestSolutions} from '../tokens/tokens.actions';
import {ISolution} from '../../pages/contests/contest-solution/interfaces/solution.interface';

@Injectable()
export class SolutionsEffects {
    loadSolutionByContestId$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadSolutionByContestId),
            switchMap(({contestId}) =>
                this.solutionsApiService.getSolutionByContestId(contestId).pipe(
                    filter<ISolution>(Boolean),
                    mergeMap((solution) => [loadSolutionSuccess(solution), loadContestSolutions(contestId, solution.id)])
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

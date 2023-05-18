import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';

import {ContestsApiService} from '../../api/contests/contests.api.service';
import {
    createContest,
    createContestError,
    createContestSuccess,
    loadContests, loadContestsError,
    loadContestsSuccess
} from './contests.actions';

@Injectable()
export class ContestsEffects {
    loadContests$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContests),
            switchMap(() =>
                this.contestsApiService.loadContests().pipe(
                    map((contests) => loadContestsSuccess(contests)),
                    catchError(() => of(loadContestsError())),
                )
            )
        )
    );

    createContest$= createEffect(() =>
        this.actions$.pipe(
            ofType(createContest),
            switchMap(({contest}) =>
                this.contestsApiService.createContest(contest).pipe(
                    map(createdContest => createContestSuccess(createdContest)),
                    catchError(() => of(createContestError())),
                ),
            ),
        )
    );

    constructor(
        private readonly actions$: Actions,
        private readonly contestsApiService: ContestsApiService,
    ) {}
}

import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, mergeMap, of, switchMap} from 'rxjs';

import {ContestsApiService} from '../../api/contests/contests.api.service';
import {
    createContest,
    createContestError,
    createContestSuccess,
    loadContest,
    loadContestError,
    loadContestResults,
    loadContestResultsError,
    loadContestResultsSuccess,
    loadContests,
    loadContestsError,
    loadContestsSuccess,
    loadContestSuccess
} from './contests.actions';
import {navigateByUrl, showSuccessNotification} from '../router/router.actions';

@Injectable()
export class ContestsEffects {
    loadContests$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContests),
            switchMap(() =>
                this.contestsApiService.getContests().pipe(
                    map((contests) => loadContestsSuccess(contests)),
                    catchError(() => of(loadContestsError())),
                )
            )
        )
    );

    loadContest$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContest),
            switchMap(({id}) =>
                this.contestsApiService.getContest(id).pipe(
                    map((contest) => loadContestSuccess(contest)),
                    catchError(() => of(loadContestError())),
                )
            )
        )
    );

    loadContestResults$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadContestResults),
            switchMap(({id}) =>
                this.contestsApiService.getContestResults(id).pipe(
                    map((results) => loadContestResultsSuccess(results)),
                    catchError(() => of(loadContestResultsError())),
                )
            )
        )
    );

    createContest$= createEffect(() =>
        this.actions$.pipe(
            ofType(createContest),
            switchMap(({contest}) =>
                this.contestsApiService.createContest(contest).pipe(
                    mergeMap(createdContest => [
                        createContestSuccess(createdContest),
                        navigateByUrl('/'),
                        showSuccessNotification('', 'Соревнование успешно создано'),
                    ]),
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

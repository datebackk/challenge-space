import {Injectable} from '@angular/core';
import {Actions, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';

import {ContestsApiService} from '../../api/contests/contests.api.service';
import {createContest, createContestError, createContestSuccess} from './contests.actions';

@Injectable()
export class ContestsEffects {
    createContest$ = this.actions$.pipe(
        ofType(createContest),
        switchMap(({contest}) =>
            this.contestsApiService.createContest(contest).pipe(
                map(createdContest => createContestSuccess(createdContest)),
                catchError(() => of(createContestError(contest))),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly contestsApiService: ContestsApiService,
    ) {}
}

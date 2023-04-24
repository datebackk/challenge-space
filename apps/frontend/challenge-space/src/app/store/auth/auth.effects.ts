import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';

import {AuthApiService} from '../../api/auth/auth.api.service';
import {
    loadUser,
    loadUserError,
    loadUserSuccess,
} from './auth.actions';

@Injectable()
export class AuthEffects {
    loadUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUser),
            switchMap(() =>
                this.authApiService.getCurrentUser().pipe(
                    map(user => loadUserSuccess(user)),
                    catchError(() => of(loadUserError())),
                ),
            ),
        ),
    );

    constructor(
        private readonly actions$: Actions,
        private readonly authApiService: AuthApiService,
    ) {}
}

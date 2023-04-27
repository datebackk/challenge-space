import {ActionReducerMap} from '@ngrx/store';

import {AUTH_FEATURE, authReducer} from './auth/auth.reducer';
import {IAuthState} from './auth/auth.state';
import {CONTESTS_FEATURE, contestsReducer} from './contests/contests.reducer';
import {IContestsState} from './contests/contests.state';

export interface IState {
    [AUTH_FEATURE]: IAuthState;
    [CONTESTS_FEATURE]: IContestsState;
}

export const reducers: ActionReducerMap<IState> = {
    [AUTH_FEATURE]: authReducer,
    [CONTESTS_FEATURE]: contestsReducer,
};

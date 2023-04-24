import {ActionReducerMap} from '@ngrx/store';

import {AUTH_FEATURE, authReducer} from './auth/auth.reducer';
import {IAuthState} from './auth/auth.state';

export interface IState {
    [AUTH_FEATURE]: IAuthState;
}

export const reducers: ActionReducerMap<IState> = {
    [AUTH_FEATURE]: authReducer,
};

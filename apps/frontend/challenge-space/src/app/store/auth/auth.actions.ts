import {createAction} from '@ngrx/store';

import {IUser} from '../../shared/interfaces/user.interface';

enum AuthActions {
    LoadUser = '[Auth] Load user',
    LoadUserSuccess = '[Auth] Load user success',
    LoadUserError = '[Auth] Load user error',
    LogoutUser = '[Auth] Logout user',
    LogoutUserSuccess = '[Auth] Logout user success',
}

export const loadUser = createAction(AuthActions.LoadUser);

export const loadUserSuccess = createAction(AuthActions.LoadUserSuccess, (user: IUser) => ({
    user,
}));

export const loadUserError = createAction(AuthActions.LoadUserError);

export const logoutUser = createAction(AuthActions.LogoutUser);

export const logoutUserSuccess = createAction(AuthActions.LogoutUserSuccess);

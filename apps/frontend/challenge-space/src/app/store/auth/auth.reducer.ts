import {createFeatureSelector, createReducer, createSelector, on} from '@ngrx/store';

import {LoadingStatus} from '../../shared/enums/loading-status.enum';
import {
    loadUserError,
    loadUserSuccess,
    logoutUser,
} from './auth.actions';
import {authInitialState, IAuthState} from './auth.state';

export const AUTH_FEATURE = 'auth';

export const authReducer = createReducer(
    authInitialState,
    on(loadUserSuccess, (state, {user}) => ({
        ...state,
        user,
        loadingStatus: LoadingStatus.Success,
    })),
    on(loadUserError, state => ({
        ...state,
        loadingStatus: LoadingStatus.Error,
    })),
    on(loadUserError, state => ({
        ...state,
        user: null,
        loadingStatus: LoadingStatus.Success,
    })),
    on(logoutUser, state => ({
        ...state,
        user: null,
        loadingStatus: LoadingStatus.Success,
    })),
);

const authFeatureSelector = createFeatureSelector<IAuthState>(AUTH_FEATURE);

export const getUser = createSelector(authFeatureSelector, state => state.user);
export const getUserLoadingStatus = createSelector(
    authFeatureSelector,
    state => state.loadingStatus,
);

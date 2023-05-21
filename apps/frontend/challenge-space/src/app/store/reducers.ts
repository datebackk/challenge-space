import {ActionReducerMap} from '@ngrx/store';

import {AUTH_FEATURE, authReducer} from './auth/auth.reducer';
import {IAuthState} from './auth/auth.state';
import {CONTESTS_FEATURE, contestsReducer} from './contests/contests.reducer';
import {IContestsState} from './contests/contests.state';
import {SOLUTIONS_FEATURE, solutionsReducer} from './solutions/solutions.reducer';
import {ISolutionsState} from './solutions/solutions.state';
import {TOKENS_FEATURE, tokensReducer} from './tokens/tokens.reducer';
import {ITokensState} from './tokens/tokens.state';

export interface IState {
    [AUTH_FEATURE]: IAuthState;
    [CONTESTS_FEATURE]: IContestsState;
    [SOLUTIONS_FEATURE]: ISolutionsState;
    [TOKENS_FEATURE]: ITokensState;
}

export const reducers: ActionReducerMap<IState> = {
    [AUTH_FEATURE]: authReducer,
    [CONTESTS_FEATURE]: contestsReducer,
    [SOLUTIONS_FEATURE]: solutionsReducer,
    [TOKENS_FEATURE]: tokensReducer,
};

import {AuthEffects} from './auth/auth.effects';
import {ContestsEffects} from './contests/contests.effects';
import {SolutionsEffects} from './solutions/solutions.effects';
import {TokensEffects} from './tokens/tokens.effects';

export const effects = [AuthEffects, ContestsEffects, SolutionsEffects, TokensEffects];

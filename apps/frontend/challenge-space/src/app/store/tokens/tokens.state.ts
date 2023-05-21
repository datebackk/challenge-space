import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {IContestTaskSolution} from '../../pages/contests/contest-solution/interfaces/contest-task-solution.interface';

export interface ITokensState extends EntityState<IContestTaskSolution> {
}

export const tokensAdapter = createEntityAdapter<IContestTaskSolution>({})

export const tokenInitialState: ITokensState = tokensAdapter.getInitialState({

})

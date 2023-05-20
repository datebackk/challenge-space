import {ISolutionWithoutId} from './solution-without-id.interface';
import {IUser} from '../../../../shared/interfaces/user.interface';
import {IContest} from '../../interfaces/contest.interface';

export interface ISolution extends ISolutionWithoutId {
    id: number;
    createdAt: string;
    user: IUser;
    contest: IContest;
    completeAt?: string;
    shouldCompleteAt: string;
}

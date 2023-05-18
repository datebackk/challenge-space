import {IContestWithoutId} from './contest-without-id.interface';

export interface IContest extends IContestWithoutId {
    id: number;
}

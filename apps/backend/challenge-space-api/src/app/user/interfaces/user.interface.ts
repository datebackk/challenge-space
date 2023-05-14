import type {IContest} from '../../contest/interfaces/contest.interface';

export interface IUser {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    contests: IContest[];
}

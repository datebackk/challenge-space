import {ContestEntity} from '../../contest/entities/contest.entity';

export interface IUser {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    contests: ContestEntity[];
}

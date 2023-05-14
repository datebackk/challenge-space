import type {IUser} from '../../user/interfaces/user.interface';

export interface IContest {
    id: number;
    user: IUser;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    duration: string;
    createdAt: string;
    updatedAt: string;
}

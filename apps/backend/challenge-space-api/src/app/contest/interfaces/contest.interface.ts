import {TaskEntity} from '../../task/entities/task.entity';
import {UserEntity} from '../../user/entities/user.entity';

export interface IContest {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
    duration: string;
    createdAt: Date;
    updatedAt: Date;
    user: UserEntity;
    tasks: TaskEntity[]
}

import type {IContest} from '../interfaces/contest.interface';
import {TaskEntity} from '../../task/entities/task.entity';

export class CreateContestDto
    implements Omit<IContest, 'user' | 'id' | 'createdAt' | 'updatedAt'>
{
    description: string;
    duration: string;
    endDate: Date;
    name: string;
    startDate: Date;
    tasks: TaskEntity[];
}

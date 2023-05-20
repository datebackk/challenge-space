import {CreateTaskDto} from '../../task/dto/create-task.dto';
import {Type} from 'class-transformer';
import {IsDate} from 'class-validator';

export class CreateContestDto {
    readonly name: string;
    readonly description: string;

    @Type(() => Date)
    @IsDate()
    readonly startDate: Date;

    @Type(() => Date)
    @IsDate()
    readonly endDate: Date;

    readonly duration: number;
    readonly tasks: CreateTaskDto[];
}

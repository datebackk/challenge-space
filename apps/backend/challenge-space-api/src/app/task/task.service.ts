import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TaskEntity} from './entities/task.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
    ) {}
    create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
    }

    findAll() {
    return `This action returns all task`;
    }

    findOne(id: number) {
    return `This action returns a #${id} task`;
    }

    update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
    }

    remove(id: number) {
    return `This action removes a #${id} task`;
    }
}

import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { SolutionService } from './solution.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import {AuthenticatedUser} from 'nest-keycloak-connect';
import {ISolutionQuery} from './interfaces/solution-query.interface';
import {TaskSolutionDto} from './dto/task-solution.dto';

@Controller('solutions')
export class SolutionController {
    constructor(private readonly solutionService: SolutionService) {}

    @Post()
    create(@AuthenticatedUser() keycloackUser, @Body() createSolutionDto: CreateSolutionDto) {
        return this.solutionService.create(keycloackUser, createSolutionDto);
    }

    @Get()
    findAll(@Query() params?: ISolutionQuery) {
        return this.solutionService.findAll(params);
    }

    @Get('solution')
    findOne(@AuthenticatedUser() keycloackUser, @Query() params?: ISolutionQuery) {
      return this.solutionService.findOne(keycloackUser, params);
    }

    @Get('complete')
    completeSolution(@AuthenticatedUser() keycloackUser, @Query() params?: ISolutionQuery) {
        return this.solutionService.completeSolution(keycloackUser, params);
    }

    @Post(':id')
    submitTaskSolution(@Param('id') solutionId: number, @Body() taskSolutionDto: TaskSolutionDto, @Query() params?: ISolutionQuery) {
        return this.solutionService.createTaskSolution(solutionId, params, taskSolutionDto);
    }

    @Get(':id')
    findOneById(@Param('id') id: string) {
        return this.solutionService.findOneById(+id);
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body() updateSolutionDto: UpdateSolutionDto) {
        return this.solutionService.update(+id, updateSolutionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.solutionService.remove(+id);
    }
}

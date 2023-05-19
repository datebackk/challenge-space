import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SolutionService } from './solution.service';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';

@Controller('solutions')
export class SolutionController {
  constructor(private readonly solutionService: SolutionService) {}

  @Post()
  create(@Body() createSolutionDto: CreateSolutionDto) {
    return this.solutionService.create(createSolutionDto);
  }

  @Get()
  findAll() {
    return this.solutionService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string) {
    return this.solutionService.findOne(+id);
  }

    @Get(':contestId')
    findOneByContestId(@Param('contestId') contestId: string) {
        return this.solutionService.findOne(+contestId);
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

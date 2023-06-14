import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {ContestService} from './contest.service';
import {CreateContestDto} from './dto/create-contest.dto';
import {UpdateContestDto} from './dto/update-contest.dto';
import {AuthenticatedUser} from 'nest-keycloak-connect';

@Controller('contests')
export class ContestController {
    constructor(private readonly contestService: ContestService) {}

    @Post()
    create(@AuthenticatedUser() keycloackUser, @Body() createContestDto: CreateContestDto) {
        return this.contestService.create(keycloackUser, createContestDto);
    }

    @Get()
    findAll() {
        return this.contestService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.contestService.findOne(+id);
    }

    @Get('results/:id')
    getContestResults(@Param('id') id: string) {
        return this.contestService.getContestResults(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateContestDto: UpdateContestDto) {
        return this.contestService.update(+id, updateContestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.contestService.remove(+id);
    }
}

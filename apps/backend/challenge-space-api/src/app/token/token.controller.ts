import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {TokenService} from './token.service';
import {CreateTokenDto} from './dto/create-token.dto';
import {UpdateTokenDto} from './dto/update-token.dto';
import {ITokenQuery} from './interfaces/token-query.interface';

@Controller('tokens')
export class TokenController {
    constructor(private readonly tokenService: TokenService) {}

    @Post()
    create(@Body() createTokenDto: CreateTokenDto) {
        return this.tokenService.create(createTokenDto);
    }

    @Get()
    findAll(@Query() params?: ITokenQuery) {
        return this.tokenService.findAll(params);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.tokenService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTokenDto: UpdateTokenDto) {
        return this.tokenService.update(+id, updateTokenDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tokenService.remove(+id);
    }
}

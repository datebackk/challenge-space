import { Injectable } from '@nestjs/common';
import { CreateTokenDto } from './dto/create-token.dto';
import { UpdateTokenDto } from './dto/update-token.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {TokenEntity} from './entities/token.entity';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>,
    ) {}
    create(createTokenDto: CreateTokenDto) {
    return 'This action adds a new token';
    }

    findAll() {
    return `This action returns all token`;
    }

    findOne(id: number) {
    return `This action returns a #${id} token`;
    }

    update(id: number, updateTokenDto: UpdateTokenDto) {
    return `This action updates a #${id} token`;
    }

    remove(id: number) {
    return `This action removes a #${id} token`;
    }
}

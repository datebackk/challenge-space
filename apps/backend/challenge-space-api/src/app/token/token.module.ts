import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TokenEntity} from './entities/token.entity';

@Module({
    controllers: [TokenController],
    providers: [TokenService],
    imports: [TypeOrmModule.forFeature([TokenEntity])],
})
export class TokenModule {}

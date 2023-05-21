import {Module} from '@nestjs/common';

import type {TypeOrmModuleOptions} from '@nestjs/typeorm';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {
    AuthGuard,
    KeycloakConnectModule,
    ResourceGuard,
    RoleGuard,
} from 'nest-keycloak-connect';
import {APP_GUARD} from '@nestjs/core';
import type {KeycloakConnectConfig} from 'nest-keycloak-connect/interface/keycloak-connect-options.interface';
import {configuration} from './config';
import {UserModule} from './user/user.module';
import {UserEntity} from './user/entities/user.entity';
import {ContestModule} from './contest/contest.module';
import {ContestEntity} from './contest/entities/contest.entity';
import { TaskModule } from './task/task.module';
import { TestCaseModule } from './test-case/test-case.module';
import {TaskEntity} from './task/entities/task.entity';
import {TestCaseEntity} from './test-case/entities/test-case.entity';
import { SolutionModule } from './solution/solution.module';
import { TokenModule } from './token/token.module';
import {SolutionEntity} from './solution/entities/solution.entity';
import {TokenEntity} from './token/entities/token.entity';
import {HttpModule} from '@nestjs/axios';
import {forwardRef} from '@angular/core';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                ...config.get<TypeOrmModuleOptions>('db'),
                entities: [UserEntity, ContestEntity, TaskEntity, TestCaseEntity, SolutionEntity, TokenEntity],
            }),
            inject: [ConfigService],
        }),
        KeycloakConnectModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                ...config.get<KeycloakConnectConfig>('keycloack'),
            }),
            inject: [ConfigService],
        }),
        HttpModule.registerAsync({
            useFactory: () => ({}),
        }),
        SolutionModule,
        UserModule,
        ContestModule,
        TaskModule,
        TestCaseModule,
        TokenModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}

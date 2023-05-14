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
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {configuration} from './config';
import {UserModule} from './user/user.module';
import {UserEntity} from './user/entities/user.entity';
import {ContestModule} from './contest/contest.module';
import {ContestEntity} from './contest/entities/contest.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => ({
                ...config.get<TypeOrmModuleOptions>('db'),
                entities: [UserEntity, ContestEntity],
            }),
            inject: [ConfigService],
        }),
        KeycloakConnectModule.registerAsync({
            useFactory: (config: ConfigService) => ({
                ...config.get<KeycloakConnectConfig>('keycloack'),
            }),
            inject: [ConfigService],
        }),
        UserModule,
        ContestModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
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

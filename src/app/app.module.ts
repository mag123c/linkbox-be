import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { BaseErrorFilter } from '../common/filters/base-error.filter';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { envConfig } from '../config/env.config';
import { DatabaseModule } from '../infra/database/database.module';
import { AppController } from './app.controller';
import { CategoriesModule } from './categories/categories.module';
import { LinksModule } from './links/links.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            ...envConfig(),
        }),
        LinksModule,
        CategoriesModule,
        UsersModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: BaseErrorFilter,
        },
    ],
    controllers: [AppController],
})
export class AppModule {}

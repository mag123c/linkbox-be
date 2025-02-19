import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, BaseExceptionFilter } from '@nestjs/core';
import { envConfig } from '../config/env.config';
import { DatabaseModule } from '../infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Module({
    imports: [
        DatabaseModule,
        ConfigModule.forRoot({
            ...envConfig(),
        }),
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: BaseExceptionFilter,
        },
    ],
})
export class AppModule {}

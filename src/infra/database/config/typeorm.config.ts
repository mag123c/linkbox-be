import type { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { isLocal, isTest } from '../../../common/utils/env.util';

export const typeORMConfig = async (configService: ConfigService) => {
    const host = configService.get<string>('DATABASE_HOST');

    // 로컬 환경에서 DATABASE_HOST가 127.0.0.1인지 확인
    if (isLocal()) {
        if (host !== '127.0.0.1' && host !== 'localhost') {
            throw new Error(`Invalid DATABASE_HOST for local environment: ${host}`);
        }
    }

    return {
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: isLocal() || isTest(),
        logging: isLocal() || isTest(),
        namingStrategy: new SnakeNamingStrategy(),
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        extra: {
            connectionLimit: 10,
        },
    } as TypeOrmModuleAsyncOptions;
};

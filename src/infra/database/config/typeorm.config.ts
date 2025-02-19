import type { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { isLocal, isTest } from '../../../common/utils/env.util';
import { DataSource, DataSourceOptions } from 'typeorm';
import { readFileSync } from 'fs';
import { join } from 'path';

export const typeORMConfig = async (configService: ConfigService) => {
    // 로컬 환경에서 DATABASE_HOST가 127.0.0.1인지 확인
    if (isLocal()) {
        const host = configService.get<string>('DATABASE_HOST');
        if (host !== '127.0.0.1' && host !== 'localhost') {
            throw new Error(`Invalid DATABASE_HOST for local environment: ${host}`);
        }
    }

    const options = {
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        autoLoadEntities: true,
        synchronize: isLocal() || isTest(),
        logging: isLocal(),
        // logging: false,
        namingStrategy: new SnakeNamingStrategy(),
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        extra: {
            connectionLimit: 10,
            idleTimeoutMillis: 30000,
        },
    } as TypeOrmModuleAsyncOptions;

    if (isLocal()) {
        await runInitSQL(options as DataSourceOptions);
    }

    return options;
};

async function runInitSQL(options: DataSourceOptions) {
    const dataSource = new DataSource(options);
    await dataSource.initialize();

    console.log('⚡ Running init.sql...');
    const sql = readFileSync(join(__dirname, '../../../../../init.sql'), 'utf8');

    try {
        await dataSource.query(sql);
        console.log('✅ init.sql executed successfully.');
    } catch (error) {
        console.error('❌ Error executing init.sql:', error);
    }
}

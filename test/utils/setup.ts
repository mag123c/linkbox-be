import { type DynamicModule, type INestApplication, type Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { Test, type TestingModule } from '@nestjs/testing';
import type { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { StorageDriver, initializeTransactionalContext } from 'typeorm-transactional';
import { envConfig } from '../../src/config/env.config';
import { setupPipe } from '../../src/config/global-pipe.config';
import { DatabaseModule } from '../../src/infra/database/database.module';
import { BaseExceptionFilter } from '../../src/common/filters/base-error.filter';

export const setupModule = async (
    modules: Array<Type<any> | DynamicModule | Promise<DynamicModule>>,
): Promise<TestingModule> => {
    if (modules.includes(DatabaseModule)) {
        initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });
    }

    return await Test.createTestingModule({
        imports: [
            ConfigModule.forRoot({
                ...envConfig(),
            }),
            ...modules,
        ],
        providers: [
            {
                provide: APP_FILTER,
                useClass: BaseExceptionFilter,
            },
        ],
    }).compile();
};

export const setupApp = async (app: INestApplication) => {
    setupPipe(app);
    await app.init();
};

// 앱 종료 시 데이터베이스 초기화
export const teardownApp = async (app: INestApplication) => {
    const dataSource = app.get<DataSource>(DataSource);

    if (dataSource.isInitialized) {
        await dataSource.query('SET foreign_key_checks = 0');

        try {
            for (const entity of dataSource.entityMetadatas) {
                const repository = dataSource.getRepository(entity.name);
                await repository.delete({});
            }
        } finally {
            // 외래 키 제약 조건 다시 활성화
            await dataSource.query('SET foreign_key_checks = 1');
        }
    }

    if (dataSource.isInitialized) {
        await dataSource.destroy();
    }

    await app.close();
};

// 특정 디비만 클리어
export const clearDatabase = async (repositories: Repository<any>[]) => {
    for (const repository of repositories) {
        await repository.delete({});
    }
};

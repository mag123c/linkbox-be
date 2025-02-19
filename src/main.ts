import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';
import { setupAppConfig } from './config/app-initialize.config';
import { ServerBootstrap } from './config/server.config';
import { GracefulShutdown } from './config/shutdown.config';
import { AppModule } from './app/app.module';

async function bootstrap() {
    initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
    });
    const logger = new Logger('Bootstrap');

    // 앱 관련 설정
    setupAppConfig(app);

    // 서버 인스턴스 생성
    const server = new ServerBootstrap(app, { logger });

    // Graceful Shutdown 설정
    const shutdown = new GracefulShutdown(app, {
        logger,
        onShutdown: async () => {
            // Keep-Alive 비활성화
            server.setKeepAliveStatus(false);
        },
    });
    shutdown.setupShutdown();

    // 서버 시작
    await server.start();
}
bootstrap();

import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export interface ShutdownOptions {
    logger?: Logger;
    onShutdown?: () => Promise<void>;
}

export class GracefulShutdown {
    private isShuttingDown = false;
    private connectionCounter = 0;
    private readonly logger: Logger;

    constructor(
        private readonly app: INestApplication,
        private readonly options: ShutdownOptions = {},
    ) {
        this.logger = options.logger || new Logger('GracefulShutdown');
    }

    public setupShutdown(): void {
        this.setupConnectionTracking();
        this.registerShutdownHandlers();
    }

    private setupConnectionTracking(): void {
        this.app.use((_req: any, res: any, next: any) => {
            if (this.isShuttingDown) {
                res.set('Connection', 'close');
                res.status(503).send('Server is in maintenance mode');
                return;
            }

            this.connectionCounter++;
            res.on('finish', () => {
                this.connectionCounter--;
            });

            next();
        });
    }

    private registerShutdownHandlers(): void {
        ['SIGTERM', 'SIGINT'].forEach((signal) => {
            process.on(signal, () => this.gracefulShutdown(signal));
        });
    }

    private async gracefulShutdown(signal: string): Promise<void> {
        if (this.isShuttingDown) return;

        this.isShuttingDown = true;
        this.logger.log(`🛠 Received ${signal}. Starting graceful shutdown...`);
        this.logger.log('👋 Stop accepting new connections');

        try {
            await this.waitForConnections();
            await this.options.onShutdown?.();
            await this.app.close();

            this.logger.log('✅ Server closed gracefully.');

            if (process.send) {
                process.send('ready');
            }

            process.exit(0);
        } catch (error) {
            this.logger.error('❌ Error during graceful shutdown:', error);
            process.exit(1);
        }
    }

    private waitForConnections(): Promise<void> {
        return new Promise<void>((resolve) => {
            const interval = setInterval(() => {
                if (this.connectionCounter === 0) {
                    clearInterval(interval);
                    resolve();
                }
                this.logger.log(`Waiting for ${this.connectionCounter} connections to complete...`);
            }, 1000);
        });
    }
}

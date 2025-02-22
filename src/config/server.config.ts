// src/config/server.config.ts
import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';

export interface ServerOptions {
    logger?: Logger;
    port?: number | string;
}

export class ServerBootstrap {
    private readonly logger: Logger;
    private readonly port: number | string;
    private isDisableKeepAlive = false;

    constructor(
        private readonly app: INestApplication,
        options: ServerOptions = {},
    ) {
        this.logger = options.logger || new Logger('ServerBootstrap');
        this.port = options.port || process.env.PORT || 5555;
        this.setupKeepAlive();
    }

    private setupKeepAlive(): void {
        this.app.use((_req: any, res: any, next: any) => {
            if (this.isDisableKeepAlive) {
                res.set('Connection', 'close');
            }
            next();
        });
    }

    public setKeepAliveStatus(status: boolean): void {
        this.isDisableKeepAlive = !status;
    }

    public async start(): Promise<void> {
        await this.app.listen(this.port, '0.0.0.0');
        this.logger.log(`🚀 Server is running on ${this.port}`);

        if (process.send) {
            process.send('ready');
            this.logger.log(`[Worker ${process.pid}] Ready signal sent to PM2`);
        }
    }
}

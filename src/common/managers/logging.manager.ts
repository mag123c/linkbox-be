import WinstonLogger from '../../config/winston.config';
import { isProduction } from '../utils/env.util';
import { LogWarnManager } from './log-warn.manager';

interface LoggingContext {
    method: string;
    url: string;
    duration: string;
    referer?: string;
    timestamp: string;
    stack?: string;
    body?: string;
    statusCode?: number;
    userId?: number;
}

export class LoggingManager {
    constructor(private readonly warnManager: LogWarnManager) {}

    logRequest(message: string, userId?: number) {
        WinstonLogger.log(message, {
            app: 'linkbox-be',
            env: process.env.NODE_ENV,
            level: 'info',
            userId,
        });
    }

    logWarn(url: string, message: string, context: LoggingContext, userId?: number) {
        const isThresholdExceeded = this.warnManager.increment(url);

        if (isThresholdExceeded) {
            // 웹훅전송필요시웹훅전송합수(웹훅인터페이스, {
            //     {
            //         statusCode: this.warnManager.threshold,
            //         message: `경고 로그 임계치 초과(${error.message})`,
            //         method: context.method,
            //         url: context.url,
            //         referer: context.referer ?? 'N/A',
            //         timestamp: context.timestamp,
            //         stack: context.stack,
            //         body: context.body,
            //     }
            // })
        }

        WinstonLogger.warn(message, {
            app: 'linkbox-be',
            env: process.env.NODE_ENV,
            level: 'warn',
            method: context.method,
            url: context.url,
            duration: context.duration,
            referer: context.referer,
            stack: context.stack,
            body: context.body,
            userId,
        });
    }

    logError(message: string, context: LoggingContext, userId?: number) {
        WinstonLogger.error(message, {
            app: 'linkbox-be',
            env: process.env.NODE_ENV,
            level: 'error',
            method: context.method,
            url: context.url,
            duration: context.duration,
            referer: context.referer,
            stack: context.stack,
            body: context.body,
            userId,
        });

        if (isProduction()) {
            // 웹훅전송필요시웹훅전송합수(웹훅인터페이스, {
            //     statusCode: context.statusCode ?? 500,
            //     message: error.message,
            //     method: context.method,
            //     url: context.url,
            //     referer: context.referer ?? 'N/A',
            //     timestamp: context.timestamp,
            //     stack: context.stack,
            //     body: context.body,
            // });
        }
    }
}

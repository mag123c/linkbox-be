import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException } from '@nestjs/common';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { LoggingManager } from '../managers/logging.manager';
import { isStaging } from '../utils/env.util';
import { koreaTimeString } from '../utils/moment.util';
import { LogWarnManager } from '../managers/log-warn.manager';
import { BaseError } from '../errors/abstract/base.error';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly loggingManager: LoggingManager;

    constructor() {
        const warnManager = new LogWarnManager(5, 60000);
        this.loggingManager = new LoggingManager(warnManager);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const startTime = Date.now();

        const request = context.switchToHttp().getRequest();
        const { method, url, user, body } = request;
        const referer = request.headers?.referer ?? undefined;

        return next.handle().pipe(
            tap(() => {
                const duration = `${Date.now() - startTime}ms`;

                // 요청 로깅
                this.loggingManager.logRequest(method, url, duration, user);
            }),

            catchError((error) => {
                const duration = `${Date.now() - startTime}ms`;

                const statusCode =
                    error instanceof BaseError ? error.code : error instanceof HttpException ? error.getStatus() : 500;

                const logContext = {
                    method,
                    url,
                    duration,
                    referer,
                    timestamp: koreaTimeString(),
                    stack: isStaging() ? error.stack : undefined,
                    body: body ?? undefined,
                    statusCode,
                };

                //Warn 로깅
                if (error instanceof BaseError) {
                    this.loggingManager.logWarn(url, error, logContext, user);
                }
                //Error 로깅
                else {
                    this.loggingManager.logError(error, logContext, user);
                }

                return throwError(() => error);
            }),
        );
    }
}

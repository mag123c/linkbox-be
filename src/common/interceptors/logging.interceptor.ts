import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseError } from '../errors/abstract/base.error';
import { LogWarnManager } from '../managers/log-warn.manager';
import { LoggingManager } from '../managers/logging.manager';
import { koreaTimeString } from '../utils/moment.util';
import { BadRequestError } from '../errors/classes/error';
import { ErrorCode } from '../errors/enum/error-code.enum';

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
        const { method, url, body } = request;
        const referer = request.headers?.referer ?? undefined;
        const userId = request.headers?.['x-user-id'];

        return next.handle().pipe(
            tap(() => {
                const duration = `${Date.now() - startTime}ms`;

                // 요청 로깅
                this.loggingManager.logRequest(method + url + duration, userId);
            }),

            catchError((error) => {
                const duration = `${Date.now() - startTime}ms`;
                const { message, stack } = error;

                if (error.message.includes('Duplicate')) {
                    error = new BadRequestError(ErrorCode.DuplicateRequest, message);
                    error.stack = stack;
                }

                const statusCode =
                    error instanceof BaseError ? error.code : error instanceof HttpException ? error.getStatus() : 500;

                const logContext = {
                    method,
                    url,
                    duration,
                    referer,
                    timestamp: koreaTimeString(),
                    stack: error.stack,
                    body: body ?? undefined,
                    statusCode,
                };

                const wholeMessage = `${logContext.method} ${logContext.url} ${logContext.duration} ${error.message}`;

                //Warn 로깅
                if (error instanceof BaseError) {
                    this.loggingManager.logWarn(url, wholeMessage, logContext, userId);
                }
                //Error 로깅
                else {
                    this.loggingManager.logError(wholeMessage, logContext, userId);
                }

                return throwError(() => error);
            }),
        );
    }
}

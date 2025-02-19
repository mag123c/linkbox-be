import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { BaseError } from '../errors/abstract/base.error';
import { IErrorResponse } from '../errors/interface/error.interface';

@Catch(Error) // 모든 Error를 처리하도록 확장
export class BaseExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest();

        let code: number;
        let message: string;
        let stack: string | undefined;

        if (exception instanceof BaseError) {
            code = exception.code;
            message = exception.message;
            stack = exception.stack;

            // 가드레이어의 에러 처리 (Interceptor를 거치지 않는 경우 로깅)
            // this.logWarn(exception, request);
        } else if (exception instanceof HttpException) {
            code = exception.getStatus();
            message = exception.message;
        } else {
            // 예상하지 못한 일반 Error 처리
            code = HttpStatus.INTERNAL_SERVER_ERROR;
            message = 'Internal Server Error';
        }

        // 응답 JSON 객체 구성
        const json: IErrorResponse = {
            code,
            message,
        };

        // 개발 환경에서는 디버깅 정보를 추가
        if (process.env.NODE_ENV !== 'production') {
            json['path'] = request.url;
            json['stack'] = stack;
        }

        response.status(code).json(json);
    }
}

import {
    BadRequestError,
    InternalServerError,
    NotFoundError,
    TooManyRequestsError,
    UnauthorizedError,
} from '../classes/error';
import type { ErrorCode } from '../enum/error-code.enum';

export class ErrorFactory {
    static createBadRequestError(code: ErrorCode, message: string): BadRequestError {
        return new BadRequestError(code, message);
    }

    static createUnauthorizedError(code: ErrorCode, message: string): UnauthorizedError {
        return new UnauthorizedError(code, message);
    }

    static createNotFoundError(code: ErrorCode, message: string): NotFoundError {
        return new NotFoundError(code, message);
    }

    static createTooManyRequestsError(code: ErrorCode, message: string): TooManyRequestsError {
        return new TooManyRequestsError(code, message);
    }

    static createInternalServerError(code: ErrorCode, message: string): InternalServerError {
        return new InternalServerError(code, message);
    }
}

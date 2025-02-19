import { BaseError } from '../abstract/base.error';
import type { ErrorCode } from '../enum/error-code.enum';

export class BadRequestError extends BaseError {
    constructor(code: ErrorCode, message: string) {
        super(code, message);
    }
}

export class UnauthorizedError extends BaseError {
    constructor(code: ErrorCode, message: string) {
        super(code, message);
    }
}

export class NotFoundError extends BaseError {
    constructor(code: ErrorCode, message: string) {
        super(code, message);
    }
}

export class TooManyRequestsError extends BaseError {
    constructor(code: ErrorCode, message: string) {
        super(code, message);
    }
}

export class InternalServerError extends BaseError {
    constructor(code: ErrorCode, message: string) {
        super(code, message);
    }
}

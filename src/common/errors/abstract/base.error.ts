import type { ErrorCode } from '../enum/error-code.enum';
import type { ErrorResponse } from '../interface/error.interface';

export abstract class BaseError extends Error {
    public readonly error: boolean;
    public readonly code: ErrorCode;
    public readonly message: string;

    constructor(code: ErrorCode, message: string) {
        super(message);
        this.error = true;
        this.code = code;
        this.message = message;
    }

    toJSON(): ErrorResponse {
        return {
            error: this.error,
            code: this.code,
            message: this.message,
        };
    }
}

export interface ErrorResponse {
    error: boolean;
    code: number;
    message: string;
}

export interface IErrorResponse {
    code: number;
    message: string;
    path?: string;
    stack?: string;
}

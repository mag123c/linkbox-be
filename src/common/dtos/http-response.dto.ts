import { HttpStatus } from '@nestjs/common';
import { HttpStatusInfo } from '../enums/http-response.enum';

export abstract class HttpResponse<T> {
    code: number;
    message: string;
    data: T | null;

    protected constructor(data: T | null = null) {
        this.code = HttpStatus.OK;
        this.message = HttpStatusInfo[HttpStatus.OK];
        this.data = data;
    }
}

export class HttpOkResponse<T> extends HttpResponse<T> {
    code: number = HttpStatus.OK;
    message: string = HttpStatusInfo[HttpStatus.OK];

    constructor(data: T | null) {
        super(data);
    }

    static of<T>(data: T | null = null): HttpOkResponse<T> {
        return new HttpOkResponse(data);
    }
}

export class HttpCreatedResponse<T> extends HttpResponse<T> {
    code: number = HttpStatus.CREATED;
    message: string = HttpStatusInfo[HttpStatus.CREATED];

    constructor(data: T | null) {
        super(data);
    }

    static of<T>(data: T | null): HttpCreatedResponse<T> {
        return new HttpCreatedResponse(data);
    }
}

export class HttpNoContentResponse<T> extends HttpResponse<T> {
    code: number = HttpStatus.NO_CONTENT;
    message: string = HttpStatusInfo[HttpStatus.NO_CONTENT];

    constructor(data: T | null = null) {
        super(data);
    }

    static of<T>(): HttpNoContentResponse<T> {
        return new HttpNoContentResponse();
    }
}

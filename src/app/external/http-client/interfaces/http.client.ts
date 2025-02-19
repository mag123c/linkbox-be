import { ClassConstructor } from 'class-transformer';
import { HttpBodyFactory, MediaType } from '../factory/request-body.factory';
import { HttpClientResponseFactory } from '../factory/response.factory';

/**
 * HTTP client interface
 */
export interface IHttpClient {
    get(): this;
    post(): this;
    put(): this;
    patch(): this;
    delete(): this;
    options(): this;
    uri(uri: string): this;
    header(headers: Record<string, string>): this;
    contentType(mediaType: MediaType): this;
    query(params: Record<string, any>): this;
    body<T>(body: HttpBodyFactory<T>): this;
    fetch(): Promise<HttpClientResponse>;
}

/**
 * HTTP response
 */
export class HttpClientResponse {
    constructor(
        private readonly data: any,
        private readonly statusCode: number,
    ) {}

    /**
     * HTTP Response data를 엔티티로 변환
     */
    toEntity<T>(entityClass: ClassConstructor<T>, path?: string): T {
        return HttpClientResponseFactory.toEntity(entityClass, this.data, path);
    }

    /**
     * HTTP response data[]를 엔티티로 변환
     */
    toEntities<T>(entityClass: ClassConstructor<T>, path: string): T[] {
        return HttpClientResponseFactory.toEntities(entityClass, this.data, path);
    }

    getData(): any {
        return this.data;
    }

    getStatusCode(): number {
        return this.statusCode;
    }
}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpBodyFactory, MediaType } from './factory/request-body.factory';
import { HttpClientResponse, IHttpClient } from './interfaces/http.client';

export class AxiosClient implements IHttpClient {
    private readonly _config: AxiosRequestConfig = {};

    constructor(baseConfig: AxiosRequestConfig) {
        this._config = baseConfig;
    }

    uri(uri: string): this {
        this._config.url = uri;
        return this;
    }

    header(headers: Record<string, string>): this {
        this._config.headers = { ...this._config.headers, ...headers };
        return this;
    }

    contentType(mediaType: MediaType): this {
        this._config.headers = { ...this._config.headers, 'Content-Type': mediaType };
        return this;
    }

    query(params: Record<string, any>): this {
        this._config.params = { ...this._config.params, ...params };
        return this;
    }

    body<T>(body: HttpBodyFactory<T>): this {
        this._config.data = body.getData();
        this.contentType(body.getMediaType());
        return this;
    }

    get(): this {
        this._config.method = 'get';
        return this;
    }

    post(): this {
        this._config.method = 'post';
        return this;
    }

    put(): this {
        this._config.method = 'put';
        return this;
    }

    patch(): this {
        this._config.method = 'patch';
        return this;
    }

    delete(): this {
        this._config.method = 'delete';
        return this;
    }

    head(): this {
        this._config.method = 'head';
        return this;
    }

    options(): this {
        this._config.method = 'options';
        return this;
    }

    async fetch<T = any>(): Promise<HttpClientResponse> {
        try {
            const axiosResponse = await axios.create(this._config).request<T>({
                ...this._config,
            });
            return this.transformResponse(axiosResponse);
        } catch (e: any) {
            console.log(e);
            return new HttpClientResponse(e.response?.data, e.response?.status);
        }
    }

    private transformResponse<T>(axiosResponse: AxiosResponse<T>): HttpClientResponse {
        return new HttpClientResponse(axiosResponse.data, axiosResponse.status);
    }
}

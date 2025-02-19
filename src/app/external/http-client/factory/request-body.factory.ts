export enum MediaType {
    APPLICATION_JSON = 'application/json',
    APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded',
    TEXT_PLAIN = 'text/plain',
}

export class HttpBodyFactory<T> {
    private constructor(
        private readonly _mediaType: MediaType,
        private readonly _data: T,
    ) {}

    static fromJSON(json: Record<string, unknown>) {
        return new HttpBodyFactory(MediaType.APPLICATION_JSON, json);
    }

    static fromFormData(form: Record<string, unknown>) {
        return new HttpBodyFactory(MediaType.APPLICATION_FORM_URLENCODED, form);
    }

    static fromText(text: string | Buffer) {
        return new HttpBodyFactory(MediaType.TEXT_PLAIN, text);
    }

    getMediaType(): MediaType {
        return this._mediaType;
    }

    getData(): T {
        return this._data;
    }
}

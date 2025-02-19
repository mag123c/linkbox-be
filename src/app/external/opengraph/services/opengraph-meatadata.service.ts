import { Inject, Injectable } from '@nestjs/common';
import { InternalServerError } from '../../../../common/errors/classes/error';
import { ErrorCode } from '../../../../common/errors/enum/error-code.enum';
import { IHttpClient } from '../../http-client/interfaces/http.client';
import { OpengraphMetadataRes } from '../dtos/opengraph-metadata.dto';

@Injectable()
export class OpenGraphService {
    private readonly parts = ['snippet', 'statistics'];
    private readonly apiKey = process.env.YOUTUBE_API_KEY;

    constructor(
        @Inject('HTTP_CLIENT')
        private readonly httpClient: IHttpClient,
    ) {}

    async getMetadata(linkUrl: string) {
        //?part=${this.parts.join(',')}&id=${videoId}&key=${this.apiKey}
        const url = `https://opengraph.io/api/1.1/site/${linkUrl}`;
        return await this.httpClient
            .uri(url)
            .header({ 'Content-Type': 'application/json' })
            .query({
                app_id: process.env.OPENGRAPH_API_KEY,
                accept_lang: 'auto',
            })
            .get()
            .fetch()
            .then((res) => {
                if (res.getStatusCode() !== 200) {
                    throw new InternalServerError(ErrorCode.InternalServerErrorWith3rdParty, 'Youtube API Error');
                }

                const item = res.getData().openGraph;

                return OpengraphMetadataRes.of({
                    title: item.title,
                    description: item.description,
                    thumbnail: item.image.url,
                });
            });
    }
}

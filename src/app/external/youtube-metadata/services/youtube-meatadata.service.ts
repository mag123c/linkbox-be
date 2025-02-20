import { Inject, Injectable } from '@nestjs/common';
import { InternalServerError } from '../../../../common/errors/classes/error';
import { ErrorCode } from '../../../../common/errors/enum/error-code.enum';
import { IHttpClient } from '../../http-client/interfaces/http.client';
import { YoutubeMetadataRes } from '../dtos/youtube-metadata.dto';

@Injectable()
export class YoutubeMetadataService {
    private readonly parts = ['snippet', 'statistics'];
    private readonly apiKey = process.env.YOUTUBE_API_KEY;

    constructor(
        @Inject('HTTP_CLIENT')
        private readonly httpClient: IHttpClient,
    ) {}

    async getMetadata(linkUrl: string) {
        //?part=${this.parts.join(',')}&id=${videoId}&key=${this.apiKey}
        const url = `https://www.googleapis.com/youtube/v3/videos`;
        const videoId = this.extractYoutubeVideoId(linkUrl);

        return await this.httpClient
            .uri(url)
            .header({ 'Content-Type': 'application/json' })
            .query({
                part: this.parts.join(','),
                id: videoId,
                key: this.apiKey,
            })
            .get()
            .fetch()
            .then((res) => {
                if (res.getStatusCode() !== 200) {
                    throw new InternalServerError(ErrorCode.InternalServerErrorWith3rdParty, 'Youtube API Error');
                }

                const item = res.getData().items[0];

                return YoutubeMetadataRes.of({
                    videoId: item.id,
                    title: item.snippet.title,
                    publishedAt: item.snippet.publishedAt,
                    thumbnail: item.snippet.thumbnails.default.url,
                });
            });
    }

    private extractYoutubeVideoId(linkUrl: string) {
        const urlObj = new URL(linkUrl);
        return urlObj.searchParams.get('v') || urlObj.pathname.split('/').pop();
    }
}

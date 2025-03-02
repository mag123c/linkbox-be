import { Inject, Injectable } from '@nestjs/common';
import { OpenGraphScraperOptions } from 'open-graph-scraper/types/lib/types';
import { InternalServerError } from '../../../../common/errors/classes/error';
import { ErrorCode } from '../../../../common/errors/enum/error-code.enum';
import { OGScrapeRes, OpengraphMetadataRes } from '../dtos/opengraph-metadata.dto';

@Injectable()
export class OpenGraphService {
    constructor(
        @Inject('OG_SCRAPER') private readonly scrapeOgMetadata: (options: OpenGraphScraperOptions) => Promise<any>,
    ) {}

    async getMetadata(linkUrl: string) {
        const options: OpenGraphScraperOptions = {
            url: linkUrl,
            timeout: 3000,
        };

        try {
            const response = await this.scrapeOgMetadata(options);
            const result = response.result;

            if (!result.success) {
                throw new InternalServerError(ErrorCode.InternalServerErrorWith3rdParty, 'OpenGraph API Error');
            }

            return OpengraphMetadataRes.of(OGScrapeRes.of(result));
        } catch (error) {
            throw new InternalServerError(ErrorCode.InternalServerErrorWith3rdParty, 'OpenGraph API Error');
        }
    }
}

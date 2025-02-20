import { Injectable } from '@nestjs/common';
import { OpengraphMetadataRes } from '../../external/opengraph/dtos/opengraph-metadata.dto';
import { OpenGraphService } from '../../external/opengraph/services/opengraph-meatadata.service';
import { YoutubeMetadataRes } from '../../external/youtube-metadata/dtos/youtube-metadata.dto';
import { YoutubeMetadataService } from '../../external/youtube-metadata/services/youtube-meatadata.service';
import { LinksReq, LinksRes } from '../dtos/links.dto';
import { LinksRepository } from '../repositories/links.repository';

@Injectable()
export class LinksService {
    constructor(
        private readonly linksRepository: LinksRepository,
        private readonly youtubeMetadataService: YoutubeMetadataService,
        private readonly openGraphService: OpenGraphService,
    ) {}

    /**
     * @API GET /links/:categoryId
     * @param categoryId
     */
    async getLinks(categoryId: number) {
        const links = await this.linksRepository.find({
            where: { category: { id: categoryId } },
            relations: ['category'],
        });

        return links.map((link) => LinksRes.of(link));
    }

    /**
     * @API POST /links
     * @param categoryId
     * @param req
     */
    async createLink(categoryId: number, req: LinksReq) {
        const metadata: YoutubeMetadataRes | OpengraphMetadataRes = req.url.includes('youtube.com')
            ? await this.youtubeMetadataService.getMetadata(req.url)
            : await this.openGraphService.getMetadata(req.url);

        const link = this.linksRepository.create({ ...req, ...metadata, category: { id: categoryId } });
        await this.linksRepository.save(link);
        return LinksRes.of(link);
    }

    /**
     * @API DELETE /links/:linkId
     * @param linkId
     */
    async deleteLink(linkId: number) {
        await this.linksRepository.softRemove({ id: linkId });
    }
}

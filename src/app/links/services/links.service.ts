import { Injectable } from '@nestjs/common';
import { LinksReq, LinksRes } from '../dtos/links.dto';
import { LinksRepository } from '../repositories/links.repository';

@Injectable()
export class LinksService {
    constructor(private readonly linksRepository: LinksRepository) {}

    /**
     * @API GET /links/:categoryId
     * @param categoryId
     */
    async getLinks(categoryId: number) {
        const links = await this.linksRepository.find({
            where: { category: { id: categoryId } },
        });
        return links.map((link) => LinksRes.of(link));
    }

    /**
     * @API POST /links
     * @param categoryId
     * @param req
     */
    async createLink(categoryId: number, req: LinksReq) {
        const link = this.linksRepository.create({ ...req, category: { id: categoryId } });
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

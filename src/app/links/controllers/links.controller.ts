import { Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { HttpNoContentResponse, HttpOkResponse } from '../../../common/dtos/http-response.dto';
import { UserGuard } from '../../../common/guards/user.guard';
import { LinksReq } from '../dtos/links.dto';
import { LinksService } from '../services/links.service';

@UseGuards(UserGuard)
@Controller('links')
export class LinksController {
    constructor(private readonly linksService: LinksService) {}

    @Get(':categoryId')
    async getLinks(@Param('categoryId', new ParseIntPipe()) categoryId: number) {
        const links = await this.linksService.getLinks(categoryId);
        return HttpOkResponse.of(links);
    }

    @Post(':categoryId')
    async createLink(@Param('categoryId', new ParseIntPipe()) categoryId: number, req: LinksReq) {
        const links = await this.linksService.createLink(categoryId, req);
        return HttpOkResponse.of(links);
    }

    @Delete(':linkId')
    async deleteLink(@Param('linksId', new ParseIntPipe()) linkId: number) {
        await this.linksService.deleteLink(linkId);
        return HttpNoContentResponse.of();
    }
}

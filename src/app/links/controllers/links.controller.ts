import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UserId } from '../../../common/decorators/user.decorator';
import { HttpNoContentResponse, HttpOkResponse } from '../../../common/dtos/http-response.dto';
import { LinksReq, UpdateLinksReq } from '../dtos/links.dto';
import { LinksService } from '../services/links.service';

// @UseGuards(JwtAuthGuard)
@Controller('links')
export class LinksController {
    constructor(private readonly linksService: LinksService) {}

    @Get(':categoryId')
    async getLinks(@UserId() userId: number, @Param('categoryId', new ParseIntPipe()) categoryId: number) {
        const links = await this.linksService.getLinks(userId, categoryId);
        return HttpOkResponse.of(links);
    }

    @Post(':categoryId')
    async createLink(
        @UserId() userId: number,
        @Param('categoryId', new ParseIntPipe()) categoryId: number,
        @Body() req: LinksReq,
    ) {
        const links = await this.linksService.createLink(userId, categoryId, req);
        return HttpOkResponse.of(links);
    }

    @Put(':linkId')
    async updateLink(@Param('linkId', new ParseIntPipe()) linkId: number, @Body() req: UpdateLinksReq) {
        await this.linksService.updateLink(linkId, req);
        return HttpNoContentResponse.of();
    }

    @Delete(':linkId')
    async deleteLink(@Param('linkId', new ParseIntPipe()) linkId: number) {
        await this.linksService.deleteLink(linkId);
        return HttpNoContentResponse.of();
    }
}

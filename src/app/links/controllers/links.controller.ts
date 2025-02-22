import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserId } from '../../../common/decorators/user.decorator';
import { HttpNoContentResponse, HttpOkResponse } from '../../../common/dtos/http-response.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { LinksReq } from '../dtos/links.dto';
import { LinksService } from '../services/links.service';

@UseGuards(JwtAuthGuard)
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

    @Delete(':linkId')
    async deleteLink(@Param('linksId', new ParseIntPipe()) linkId: number) {
        await this.linksService.deleteLink(linkId);
        return HttpNoContentResponse.of();
    }
}

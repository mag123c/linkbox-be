import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { UserId } from '../../../common/decorators/user.decorator';
import { HttpNoContentResponse, HttpOkResponse } from '../../../common/dtos/http-response.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { CategoriesReq } from '../dtos/categories.dto';
import { CategoriesService } from '../services/categories.service';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoiresService: CategoriesService) {}

    @Get()
    async getCategories(@UserId() userId: number) {
        const categories = await this.categoiresService.getCategories(userId);
        return HttpOkResponse.of(categories);
    }

    @Post()
    async createCategory(@UserId() userId: number, @Body() req: CategoriesReq) {
        const category = await this.categoiresService.createCategory(userId, req);
        return HttpOkResponse.of(category);
    }

    @HttpCode(204)
    @Delete(':categoryId')
    async deleteCategory(@UserId() userId: number, @Param('categoryId', new ParseIntPipe()) categoryId: number) {
        await this.categoiresService.deleteCategory(userId, categoryId);
        return HttpNoContentResponse.of();
    }
}

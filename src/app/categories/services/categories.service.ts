import { Injectable } from '@nestjs/common';
import { CategoriesReq, CategoriesRes } from '../dtos/categories.dto';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    /**
     * @API GET /links/categories
     * @param userId
     */
    async getCategories(userId: number) {
        const categories = await this.categoriesRepository.find({ where: { user: { id: userId } } });
        return categories.map((category) => CategoriesRes.of(category));
    }

    /**
     * @API POST /links/categories
     * @param userId
     * @param req
     */
    async createCategory(userId: number, req: CategoriesReq) {
        const category = this.categoriesRepository.create({ name: req.categoryName, user: { id: userId } });
        await this.categoriesRepository.save(category);
        return CategoriesRes.of(category);
    }

    /**
     * @API DELETE /links/categories
     * @param userId
     * @param req
     */
    async deleteCategory(userId: number, categoryId: number) {
        await this.categoriesRepository.softRemove({
            id: categoryId,
            user: { id: userId },
        });
    }
}

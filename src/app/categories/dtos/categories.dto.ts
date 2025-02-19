import { IsNotEmpty, IsString } from 'class-validator';
import { Categories } from '../entities/categories.entity';

export class CategoriesReq {
    @IsString()
    @IsNotEmpty()
    categoryName!: string;
}

export class CategoriesRes {
    id!: number;
    name!: string;

    static of(entity: Categories): CategoriesRes {
        const dto = new CategoriesRes();
        dto.id = entity.id;
        dto.name = entity.name;
        return dto;
    }
}

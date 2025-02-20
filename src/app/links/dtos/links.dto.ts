import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Links } from '../entities/links.entity';

export class LinksRes {
    id!: number;
    title!: string;
    url!: string;
    thumbnail!: string;
    memo?: string;
    categoryId!: number;
    createdAt!: Date;
    updatedAt!: Date;

    static of(entity: Links): LinksRes {
        const dto = new LinksRes();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.url = entity.url;
        dto.thumbnail = entity.thumbnail;
        dto.memo = entity.memo;
        dto.categoryId = entity.category.id;
        dto.createdAt = entity.createdDt;
        dto.updatedAt = entity.updatedDt;
        return dto;
    }
}

export class LinksReq {
    @IsString()
    @IsNotEmpty()
    url!: string;

    @IsString()
    @IsOptional()
    memo?: string;
}

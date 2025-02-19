import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LinksRes {
    id!: number;
    title!: string;
    url!: string;
    memo?: string;
    categoryId!: number;
    createdAt!: string;
    updatedAt!: string;

    static of(entity: any): LinksRes {
        const dto = new LinksRes();
        dto.id = entity.id;
        dto.title = entity.title;
        dto.url = entity.url;
        dto.memo = entity.memo;
        dto.categoryId = entity.category.id;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}

export class LinksReq {
    @IsString()
    @IsNotEmpty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    url!: string;

    @IsString()
    @IsOptional()
    memo?: string;
}

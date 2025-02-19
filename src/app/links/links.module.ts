import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Links } from './entities/links.entity';
import { LinkCategories } from './entities/link-categories.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Links, LinkCategories])],
})
export class LinksModule {}

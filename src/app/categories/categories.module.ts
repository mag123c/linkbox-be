import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './controllers/categories.controller';
import { Categories } from './entities/categories.entity';
import { CategoriesRepository } from './repositories/categories.repository';
import { CategoriesService } from './services/categories.service';

@Module({
    imports: [TypeOrmModule.forFeature([Categories])],
    providers: [CategoriesService, CategoriesRepository],
    controllers: [CategoriesController],
})
export class CategoriesModule {}

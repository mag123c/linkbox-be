import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Categories } from '../entities/categories.entity';

@Injectable()
export class CategoriesRepository extends Repository<Categories> {
    constructor(private dataSource: DataSource) {
        super(Categories, dataSource.createEntityManager());
    }
}

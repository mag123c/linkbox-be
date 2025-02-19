import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Links } from '../entities/links.entity';

@Injectable()
export class LinksRepository extends Repository<Links> {
    constructor(private dataSource: DataSource) {
        super(Links, dataSource.createEntityManager());
    }
}

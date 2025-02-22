import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BadRequestError } from '../../../common/errors/classes/error';
import { ErrorCode } from '../../../common/errors/enum/error-code.enum';
import { Links } from '../entities/links.entity';

@Injectable()
export class LinksRepository extends Repository<Links> {
    constructor(private dataSource: DataSource) {
        super(Links, dataSource.createEntityManager());
    }

    async saveLink(link: Links) {
        try {
            await this.save(link);
        } catch (e: any) {
            if (e.message.includes('Duplicate')) {
                throw new BadRequestError(ErrorCode.DuplicateRequest, 'Link already exists');
            }
            throw e;
        }
    }
}

import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasedDeletableEntity } from '../../../infra/database/entities/base.entity';
import { LinkCategories } from './link-categories.entity';
import { Users } from '../../users/entities/users.entity';

@Entity('links', { schema: 'linkbox' })
export class Links extends BasedDeletableEntity {
    @Column('varchar', { length: 100, unique: true })
    title!: string;

    @Column('varchar', { length: 255, nullable: true })
    memo?: string;

    @Column('varchar', { length: 255, nullable: true })
    thumbnail?: string;

    @Column('timestamp', { precision: 0, default: null })
    publishedAt?: Date;

    @ManyToOne(() => LinkCategories, (category) => category.id, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category!: LinkCategories;
}

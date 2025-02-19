import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasedDeletableEntity } from '../../../infra/database/entities/base.entity';
import { Categories } from '../../categories/entities/categories.entity';

@Entity('links')
export class Links extends BasedDeletableEntity {
    @Column('varchar', { length: 100, unique: true })
    title!: string;

    @Column('varchar', { length: 255, nullable: true })
    description?: string;

    @Column('varchar', { length: 100, nullable: true })
    videoId?: string;

    @Column('varchar', { length: 255, nullable: true })
    memo?: string;

    @Column('varchar', { length: 255, nullable: true })
    thumbnail?: string;

    @Column('timestamp', { precision: 0, default: null })
    publishedAt?: Date;

    @ManyToOne(() => Categories, (category) => category.id, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category!: Categories;
}

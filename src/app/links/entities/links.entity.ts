import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BasedDeletableEntity } from '../../../infra/database/entities/base.entity';
import { Categories } from '../../categories/entities/categories.entity';
import { Users } from '../../users/entities/users.entity';

@Entity('links')
@Index(['title', 'url', 'user'], { unique: true })
export class Links extends BasedDeletableEntity {
    @Column('varchar', { length: 100 })
    title!: string;

    @Column('varchar', { length: 255 })
    url!: string;

    @Column('varchar', { length: 255, default: null })
    thumbnail!: string;

    @Column('varchar', { length: 255, nullable: true })
    description?: string;

    @Column('varchar', { length: 100, nullable: true })
    videoId?: string;

    @Column('varchar', { length: 255, nullable: true })
    memo?: string;

    @Column('timestamp', { precision: 0, default: null })
    publishedAt?: Date;

    @ManyToOne(() => Categories, (category) => category.links, { nullable: false })
    @JoinColumn({ name: 'category_id' })
    category!: Categories;

    @ManyToOne(() => Users, (user) => user.links, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: Users;
}

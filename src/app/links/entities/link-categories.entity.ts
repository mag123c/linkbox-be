import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasedDeletableEntity } from '../../../infra/database/entities/base.entity';
import { Users } from '../../users/entities/users.entity';
import { Links } from './links.entity';

@Entity('link_categories')
export class LinkCategories extends BasedDeletableEntity {
    @Column('varchar', { length: 100, unique: true })
    name!: string;

    @ManyToOne(() => Users, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: Users;

    @OneToMany(() => Links, (link) => link.category, {
        cascade: ['soft-remove', 'recover'],
    })
    links?: Links[];
}

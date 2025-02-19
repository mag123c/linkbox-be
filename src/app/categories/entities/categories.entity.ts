import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BasedDeletableEntity } from '../../../infra/database/entities/base.entity';
import { Links } from '../../links/entities/links.entity';
import { Users } from '../../users/entities/users.entity';

@Entity('categories')
export class Categories extends BasedDeletableEntity {
    @Column('varchar', { length: 100, unique: true })
    name!: string;

    @ManyToOne(() => Users, (user) => user.id, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    user!: Users;

    @OneToMany(() => Links, (link) => link.category, {
        cascade: ['soft-remove', 'recover'],
        eager: true,
    })
    links?: Links[];
}

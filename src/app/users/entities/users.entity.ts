import { Column, Entity, OneToMany } from 'typeorm';
import { BasedDeletableEntity } from '../../../infra/database/entities/base.entity';
import { Categories } from '../../categories/entities/categories.entity';

@Entity('user')
export class Users extends BasedDeletableEntity {
    @Column('varchar', { length: 100, unique: true })
    uuid!: string;

    @OneToMany(() => Categories, (category) => category.user, {
        cascade: ['soft-remove', 'recover'],
    })
    categories?: Categories[];
}

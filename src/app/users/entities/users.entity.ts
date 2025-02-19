import { Column, Entity, OneToMany } from 'typeorm';
import { BasedDeletableEntity, BasedEntity } from '../../../infra/database/entities/base.entity';
import { LinkCategories } from '../../links/entities/link-categories.entity';
import { Links } from '../../links/entities/links.entity';

@Entity('user', { schema: 'linkbox' })
export class Users extends BasedEntity {
    @Column('varchar', { length: 100, unique: true })
    uuid!: string;

    @OneToMany(() => LinkCategories, (category) => category.user, {
        cascade: ['soft-remove', 'recover'],
    })
    categories?: LinkCategories[];
}

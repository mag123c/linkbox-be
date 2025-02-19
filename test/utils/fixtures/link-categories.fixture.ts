import { faker } from '@faker-js/faker/.';
import { Categories } from '../../../src/app/categories/entities/categories.entity';
import { Users } from '../../../src/app/users/entities/users.entity';
import { UsersFixture } from './user.fixture';

export class CategoriesFixture {
    createTestCategory(user?: Users): Categories {
        return {
            id: faker.number.int({ min: 1, max: 10000000 }),
            name: faker.lorem.word(5),
            user: user ?? new UsersFixture().createTestUser(),
        } as unknown as Categories;
    }
}

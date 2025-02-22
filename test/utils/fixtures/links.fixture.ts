import { faker } from '@faker-js/faker/.';
import { Categories } from '../../../src/app/categories/entities/categories.entity';
import { Links } from '../../../src/app/links/entities/links.entity';
import { Users } from '../../../src/app/users/entities/users.entity';
import { CategoriesFixture } from './link-categories.fixture';
import { UsersFixture } from './user.fixture';

export class LinksFixture {
    createTestLink(category?: Categories, user?: Users): Links {
        return {
            id: faker.number.int({ min: 1, max: 10000000 }),
            title: faker.lorem.word(10),
            url: faker.internet.url(),
            thumbnail: faker.image.url(),
            category: category ?? new CategoriesFixture().createTestCategory(),
            user: user ?? new UsersFixture().createTestUser(),
        } as Links;
    }
}

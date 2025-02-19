import { faker } from '@faker-js/faker/.';
import { Categories } from '../../../src/app/categories/entities/categories.entity';
import { Links } from '../../../src/app/links/entities/links.entity';
import { CategoriesFixture } from './link-categories.fixture';

export class LinksFixture {
    createTestLink(category?: Categories): Links {
        return {
            id: faker.number.int({ min: 1, max: 10000000 }),
            title: faker.lorem.word(10),
            category: category ?? new CategoriesFixture().createTestCategory(),
        } as Links;
    }
}

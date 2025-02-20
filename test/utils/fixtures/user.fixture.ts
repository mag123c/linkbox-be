import { faker } from '@faker-js/faker/.';
import { Users } from '../../../src/app/users/entities/users.entity';
import { generateUUIDv8 } from '../../../src/common/utils/crypt.util';

export class UsersFixture {
    createTestUser(): Users {
        return {
            id: faker.number.int({ min: 1, max: 10000000 }),
            name: faker.string.alpha({ length: 10 }),
            thumbnail: faker.number.int({ min: 1, max: 12 }),
            uuid: generateUUIDv8(),
        } as Users;
    }
}

import { INestApplication } from '@nestjs/common';
import { setupApp, setupModule, teardownApp } from '../utils/setup';
import { DatabaseModule } from '../../src/infra/database/database.module';
import { DataSource } from 'typeorm';
import { generateUUIDv8 } from '../../src/common/utils/crypt.util';
import { Users } from '../../src/app/users/entities/users.entity';
import { Links } from '../../src/app/links/entities/links.entity';
import { LinkCategories } from '../../src/app/links/entities/link-categories.entity';
import { LinksModule } from '../../src/app/links/links.module';
import { UsersModule } from '../../src/app/users/users.module';

describe('엔터티에 설정되어있는 관계 테스트', () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleRef = await setupModule([DatabaseModule, LinksModule, UsersModule]);
        app = moduleRef.createNestApplication();
        await setupApp(app);

        dataSource = app.get<DataSource>(DataSource);
    });

    afterAll(async () => {
        await teardownApp(app);
        await app.close();
    });

    it('카테고리를 삭제하면 링크도 삭제된다.', async () => {
        // given
        const user = new UsersFixture().createTestUser();
        const category = new LinkCategoriesFixture().createTestCategory(user);
        const link = new LinksFixture().createTestLink(category);

        await dataSource.getRepository(Users).save(user);
        await dataSource.getRepository(LinkCategories).save(category);
        link.id = (await dataSource.getRepository(Links).save(link)).id;

        // when
        category.links = [link];
        await dataSource.getRepository(LinkCategories).softRemove(category);

        const sut = await dataSource.getRepository(Links).findOne({ where: { id: link.id } });

        // then
        expect(sut).toBeNull();
        expect((await dataSource.getRepository(Links).findOne({ where: { id: link.id }, withDeleted: true }))?.id).toBe(
            link.id,
        );
    });
});

class UsersFixture {
    createTestUser(): Users {
        return {
            uuid: generateUUIDv8(),
        } as Users;
    }
}

class LinksFixture {
    createTestLink(category?: LinkCategories): Links {
        return {
            title: 'test',
            category: category ?? new LinkCategoriesFixture().createTestCategory(),
        } as Links;
    }
}

class LinkCategoriesFixture {
    createTestCategory(user?: Users): LinkCategories {
        return {
            name: 'test',
            user: user ?? new UsersFixture().createTestUser(),
        } as LinkCategories;
    }
}

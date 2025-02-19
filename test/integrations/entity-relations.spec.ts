import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesModule } from '../../src/app/categories/categories.module';
import { Categories } from '../../src/app/categories/entities/categories.entity';
import { CategoriesService } from '../../src/app/categories/services/categories.service';
import { Links } from '../../src/app/links/entities/links.entity';
import { LinksModule } from '../../src/app/links/links.module';
import { LinksService } from '../../src/app/links/services/links.service';
import { Users } from '../../src/app/users/entities/users.entity';
import { UsersModule } from '../../src/app/users/users.module';
import { DatabaseModule } from '../../src/infra/database/database.module';
import { CategoriesFixture } from '../utils/fixtures/link-categories.fixture';
import { LinksFixture } from '../utils/fixtures/links.fixture';
import { UsersFixture } from '../utils/fixtures/user.fixture';
import { setupApp, setupModule, teardownApp } from '../utils/setup';

describe('엔터티에 설정되어있는 관계 테스트', () => {
    let app: INestApplication;
    let linksService: LinksService;
    let categoriesService: CategoriesService;

    let linksRepository: Repository<Links>;
    let categoriesRepository: Repository<Categories>;
    let usersRepository: Repository<Users>;

    beforeAll(async () => {
        const moduleRef = await setupModule([DatabaseModule, LinksModule, CategoriesModule, UsersModule]);
        app = moduleRef.createNestApplication();
        await setupApp(app);

        linksService = moduleRef.get<LinksService>(LinksService);
        categoriesService = moduleRef.get<CategoriesService>(CategoriesService);

        linksRepository = moduleRef.get<Repository<Links>>(getRepositoryToken(Links));
        categoriesRepository = moduleRef.get<Repository<Categories>>(getRepositoryToken(Categories));
        usersRepository = moduleRef.get<Repository<Users>>(getRepositoryToken(Users));
    });

    afterEach(async () => {
        await linksRepository.delete({});
        await categoriesRepository.delete({});
        await usersRepository.delete({});
    });

    afterAll(async () => {
        await teardownApp(app);
        await app.close();
    });

    it('카테고리를 삭제하면 링크도 삭제된다.', async () => {
        // given
        const user = new UsersFixture().createTestUser();
        const category = new CategoriesFixture().createTestCategory(user);
        const link = new LinksFixture().createTestLink(category);

        await usersRepository.save(user);
        await categoriesRepository.save(category);
        await linksRepository.save(link);

        // when
        category.links = [link];
        await categoriesService.deleteCategory(user.id, category.id);
        const sut = await categoriesRepository.findOne({ where: { id: category.id } });

        // then
        expect(sut).toBeNull();
        expect((await linksRepository.findOneOrFail({ where: { id: link.id } })).id).toBe(link.id);
    });

    it('유저를 삭제하면 카테고리도 삭제된다.', async () => {
        // given
        const user = new UsersFixture().createTestUser();
        const category = new CategoriesFixture().createTestCategory(user);
        const link = new LinksFixture().createTestLink(category);

        await usersRepository.save(user);
        await categoriesRepository.save(category);
        await linksRepository.save(link);

        // when
        category.links = [link];
        user.categories = [category];
        await usersRepository.softRemove(user);

        const sut = await categoriesRepository.findOne({ where: { id: category.id } });

        // then
        expect(sut).toBeNull();
        expect((await categoriesRepository.findOneOrFail({ where: { id: category.id }, withDeleted: true })).id).toBe(
            category.id,
        );
    });

    it('유저를 삭제하면 링크도 삭제된다.', async () => {
        // given
        const user = new UsersFixture().createTestUser();
        const category = new CategoriesFixture().createTestCategory(user);
        const link = new LinksFixture().createTestLink(category);

        await usersRepository.save(user);
        await categoriesRepository.save(category);
        await linksRepository.save(link);

        // when
        user.categories = [category];
        category.links = [link];
        await usersRepository.softRemove(user);

        const sut = await linksRepository.findOne({ where: { id: link.id } });

        // then
        expect(sut).toBeNull();
        expect((await linksRepository.findOneOrFail({ where: { id: link.id }, withDeleted: true })).id).toBe(link.id);
    });

    it('유저를 복구하면, 카테고리와 링크도 복구된다.', async () => {
        // given
        const user = new UsersFixture().createTestUser();
        const category = new CategoriesFixture().createTestCategory(user);
        const link = new LinksFixture().createTestLink(category);

        await usersRepository.save(user);
        await categoriesRepository.save(category);
        await linksRepository.save(link);

        // when
        user.categories = [category];
        category.links = [link];
        await usersRepository.softRemove(user);
        await usersRepository.recover(user);

        const sut = await categoriesRepository.findOne({ where: { id: category.id } });

        // then
        expect(sut).not.toBeNull();
        expect(sut?.links).toHaveLength(1);
    });
});

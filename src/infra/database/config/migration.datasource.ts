import * as dotenv from 'dotenv';
import * as path from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { isDev } from '../../../common/utils/env.util';

dotenv.config({ path: path.resolve(__dirname, `../../../../.env.${process.env.NODE_ENV}`) });

export default new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    migrations: [isDev() ? __dirname + '/migrations/dev/*.ts' : __dirname + '/migrations/prod/*.ts'],
    entities: [__dirname + '/../../../app/**/*.entity.ts'],
    logging: true,
    namingStrategy: new SnakeNamingStrategy(),
});

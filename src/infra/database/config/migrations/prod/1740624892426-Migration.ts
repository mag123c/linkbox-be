import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740624892426 implements MigrationInterface {
    name = 'Migration1740624892426';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_48f0690983e955b500b4a3e029\` ON \`categories\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(100) NULL`);
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_2d2901186544e44b2ecf7d0d0d\` ON \`categories\` (\`name\`, \`user_id\`, \`deleted_dt\`)`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_2d2901186544e44b2ecf7d0d0d\` ON \`categories\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_48f0690983e955b500b4a3e029\` ON \`categories\` (\`name\`, \`user_id\`)`,
        );
    }
}

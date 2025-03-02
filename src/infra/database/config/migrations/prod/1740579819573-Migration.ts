import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740579819573 implements MigrationInterface {
    name = 'Migration1740579819573';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_5fd9c4f7e58d0ff1df335ad5a3\` ON \`links\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`ALTER TABLE \`links\` ADD \`user_id\` int UNSIGNED NOT NULL`);
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_234f4a76010b4d7e8725d87a67\` ON \`links\` (\`title\`, \`url\`, \`user_id\`)`,
        );
        await queryRunner.query(
            `CREATE UNIQUE INDEX \`IDX_48f0690983e955b500b4a3e029\` ON \`categories\` (\`name\`, \`user_id\`)`,
        );
        await queryRunner.query(
            `ALTER TABLE \`links\` ADD CONSTRAINT \`FK_9f8dea86e48a7216c4f5369c1e4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`links\` DROP FOREIGN KEY \`FK_9f8dea86e48a7216c4f5369c1e4\``);
        await queryRunner.query(`DROP INDEX \`IDX_48f0690983e955b500b4a3e029\` ON \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_234f4a76010b4d7e8725d87a67\` ON \`links\``);
        await queryRunner.query(`ALTER TABLE \`links\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\` (\`name\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_5fd9c4f7e58d0ff1df335ad5a3\` ON \`links\` (\`title\`)`);
    }
}

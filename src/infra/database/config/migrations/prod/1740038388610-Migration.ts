import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1740038388610 implements MigrationInterface {
    name = 'Migration1740038388610';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`links\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`created_dt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_dt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_dt\` timestamp(0) NULL, \`title\` varchar(100) NOT NULL, \`url\` varchar(255) NOT NULL, \`thumbnail\` varchar(255) NULL, \`description\` varchar(255) NULL, \`video_id\` varchar(100) NULL, \`memo\` varchar(255) NULL, \`published_at\` timestamp(0) NULL, \`category_id\` int UNSIGNED NOT NULL, UNIQUE INDEX \`IDX_5fd9c4f7e58d0ff1df335ad5a3\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`categories\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`created_dt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_dt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_dt\` timestamp(0) NULL, \`name\` varchar(100) NOT NULL, \`user_id\` int UNSIGNED NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE \`users\` (\`id\` int UNSIGNED NOT NULL AUTO_INCREMENT, \`created_dt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_dt\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`deleted_dt\` timestamp(0) NULL, \`uuid\` varchar(100) NOT NULL, \`name\` varchar(100) NOT NULL, \`thumbnail\` tinyint NOT NULL, UNIQUE INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE \`links\` ADD CONSTRAINT \`FK_42692729856abf63f8081f29394\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_2296b7fe012d95646fa41921c8b\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_2296b7fe012d95646fa41921c8b\``);
        await queryRunner.query(`ALTER TABLE \`links\` DROP FOREIGN KEY \`FK_42692729856abf63f8081f29394\``);
        await queryRunner.query(`DROP INDEX \`IDX_951b8f1dfc94ac1d0301a14b7e\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_5fd9c4f7e58d0ff1df335ad5a3\` ON \`links\``);
        await queryRunner.query(`DROP TABLE \`links\``);
    }
}

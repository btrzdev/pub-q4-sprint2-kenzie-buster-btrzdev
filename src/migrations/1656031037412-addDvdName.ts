import { MigrationInterface, QueryRunner } from "typeorm";

export class addDvdName1656031037412 implements MigrationInterface {
    name = 'addDvdName1656031037412'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" ADD "name" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP COLUMN "name"`);
    }

}

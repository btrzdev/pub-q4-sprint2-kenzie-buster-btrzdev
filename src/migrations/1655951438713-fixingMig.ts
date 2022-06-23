import { MigrationInterface, QueryRunner } from "typeorm";

export class fixingMig1655951438713 implements MigrationInterface {
    name = 'fixingMig1655951438713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" ADD "name" character varying NOT NULL`);
    }

}

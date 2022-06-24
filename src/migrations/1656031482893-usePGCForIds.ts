import { MigrationInterface, QueryRunner } from "typeorm";

export class usePGCForIds1656031482893 implements MigrationInterface {
    name = 'usePGCForIds1656031482893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d"`);
        await queryRunner.query(`ALTER TABLE "dvds" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "carts" DROP CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "carts" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "dvds" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "carts" ADD CONSTRAINT "FK_a76ead6fce8f9e9ef430ef5208d" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stock" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

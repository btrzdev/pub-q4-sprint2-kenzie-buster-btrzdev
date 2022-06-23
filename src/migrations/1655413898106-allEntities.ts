import { MigrationInterface, QueryRunner } from "typeorm";

export class allEntities1655413898106 implements MigrationInterface {
  name = "allEntities1655413898106";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`
    );
    await queryRunner.query(
      `CREATE TABLE "stock" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "dvds" ("id" uuid NOT NULL, "name" character varying NOT NULL, "duration" character varying NOT NULL, "cartId" uuid, "stockId" uuid, CONSTRAINT "PK_bcd090a9e4428d665c5ace6f433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "carts" ("id" uuid NOT NULL, "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "carts_dvds_dvds" ("cartsId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_214606f61aa69591967a4c0fc82" PRIMARY KEY ("cartsId", "dvdsId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3e127a7b4e2b6b60df4bd45a04" ON "carts_dvds_dvds" ("cartsId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7be727e5908ad31dc1a490cff5" ON "carts_dvds_dvds" ("dvdsId") `
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" ADD CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" ADD CONSTRAINT "FK_3e127a7b4e2b6b60df4bd45a04b" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" ADD CONSTRAINT "FK_7be727e5908ad31dc1a490cff57" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" DROP CONSTRAINT "FK_7be727e5908ad31dc1a490cff57"`
    );
    await queryRunner.query(
      `ALTER TABLE "carts_dvds_dvds" DROP CONSTRAINT "FK_3e127a7b4e2b6b60df4bd45a04b"`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`
    );
    await queryRunner.query(
      `ALTER TABLE "dvds" DROP CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7be727e5908ad31dc1a490cff5"`
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3e127a7b4e2b6b60df4bd45a04"`
    );
    await queryRunner.query(`DROP TABLE "carts_dvds_dvds"`);
    await queryRunner.query(`DROP TABLE "carts"`);
    await queryRunner.query(`DROP TABLE "dvds"`);
    await queryRunner.query(`DROP TABLE "stock"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}

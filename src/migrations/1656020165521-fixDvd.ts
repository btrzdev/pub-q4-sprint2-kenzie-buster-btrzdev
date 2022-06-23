import { MigrationInterface, QueryRunner } from "typeorm";
import { hashSync } from "bcrypt";

export class fixDvd1656020165521 implements MigrationInterface {
  name = "fixDvd1656020165521";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dvds" DROP CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a"`
    );
    await queryRunner.query(`ALTER TABLE "dvds" DROP COLUMN "cartId"`);
    await queryRunner.query(
      `INSERT INTO "users" 
      ("email","password","isAdm","name")
      VALUES ('kenzie@mail.com', '${hashSync(
        "umaSenhaForte!",
        10
      )}', true, 'Jane Doe') `
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dvds" ADD "cartId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "dvds" ADD CONSTRAINT "FK_ebb473cf371f4a2f8e94ebc029a" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}

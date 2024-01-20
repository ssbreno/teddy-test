import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705769888297 implements MigrationInterface {
  name = "Migrations1705769888297";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "url" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "original_url" character varying NOT NULL, "short_url" character varying NOT NULL, "click_count" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_id" uuid, CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "url" ADD CONSTRAINT "FK_5a6f06cf39e1d19c00f7524c4e8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "url" DROP CONSTRAINT "FK_5a6f06cf39e1d19c00f7524c4e8"`,
    );
    await queryRunner.query(`DROP TABLE "url"`);
  }
}

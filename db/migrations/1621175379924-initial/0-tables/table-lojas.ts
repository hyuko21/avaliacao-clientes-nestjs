import { DB_SCHEMA } from '../../../helpers/schemas';
import { MigrationInterface, QueryRunner } from 'typeorm';

const tablePath = `${DB_SCHEMA.AVALIACOES}.lojas`;

export class initialTablesLojas1621175379924 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ${tablePath} (
          "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
          "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
          "id" uuid NOT NULL DEFAULT gen_random_uuid(),
          "nome" VARCHAR NOT NULL,
          CONSTRAINT "pk_lojas_id" PRIMARY KEY ("id")
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${tablePath} CASCADE`);
  }
}

import { DB_SCHEMA } from '../../../helpers/schemas';
import { MigrationInterface, QueryRunner } from 'typeorm';

const tablePath = `${DB_SCHEMA.AVALIACOES}.transacoes`;

export class initialTablesTransacoes1621175379924
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS ${tablePath} (
          "criado_em" TIMESTAMP NOT NULL DEFAULT now(),
          "atualizado_em" TIMESTAMP NOT NULL DEFAULT now(),
          "id" uuid NOT NULL DEFAULT gen_random_uuid(),
          "valor" NUMERIC NOT NULL,
          "data" timestamp NOT NULL,
          "id_cliente" uuid NOT NULL,
          "id_loja" uuid NOT NULL,
          "id_colaborador" uuid NOT NULL,
          CONSTRAINT "pk_transacoes_id" PRIMARY KEY ("id")
        )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${tablePath} CASCADE`);
  }
}

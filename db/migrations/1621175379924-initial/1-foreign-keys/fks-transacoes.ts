import {
  addForeignKeySql,
  dropForeignKeySql,
  ForeignKeyOptions,
} from '../../../helpers/foreign-key';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { DB_SCHEMA } from '../../../helpers/schemas';

const tableName = 'transacoes';
const foreignKeys = [
  {
    schema: DB_SCHEMA.AVALIACOES,
    table: tableName,
    fields: ['id_cliente'],
    ref: {
      schema: DB_SCHEMA.AVALIACOES,
      table: 'clientes',
    },
  },
  {
    schema: DB_SCHEMA.AVALIACOES,
    table: tableName,
    fields: ['id_loja'],
    ref: {
      schema: DB_SCHEMA.AVALIACOES,
      table: 'lojas',
    },
  },
  {
    schema: DB_SCHEMA.AVALIACOES,
    table: tableName,
    fields: ['id_colaborador'],
    ref: {
      schema: DB_SCHEMA.AVALIACOES,
      table: 'colaboradores',
    },
  },
] as ForeignKeyOptions[];

export class initialFksTransacoes1621175379925 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      foreignKeys.reduce(
        (sql, fkItem) => `${addForeignKeySql(fkItem)};\n${sql}`,
        '',
      ),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      foreignKeys.reduce(
        (sql, fkItem) => `${dropForeignKeySql(fkItem)};\n${sql}`,
        '',
      ),
    );
  }
}

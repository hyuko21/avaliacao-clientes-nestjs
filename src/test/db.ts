import { EnvConfigModule } from '@/config/env-config.module';
import { resolve } from 'path';
import { Connection, createConnection, getConnection } from 'typeorm';

export function createTestConnection(): Promise<Connection> {
  EnvConfigModule.register();
  return createConnection({
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: Number(process.env['DB_PORT']),
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    schema: process.env['DB_SCHEMA'],
    database: process.env['DB_DATABASE'],
    entities: [
      resolve(
        __dirname,
        '..',
        'modules',
        '**',
        'data',
        'entities',
        '*.{ts,js}',
      ),
    ],
  });
}

export function closeTestConnection(): Promise<void> {
  return getConnection().close();
}

export function getTestConnection(): Connection {
  return getConnection();
}

export function truncate(entities?: any[]): Promise<void> {
  if (!entities) {
    entities = getTestConnection().entityMetadatas;
  }
  const entityTables = entities.reduce((acc, entityItem) => {
    const entityRepository = getConnection().getRepository(entityItem.name);
    if (entityRepository.metadata.tableType === 'view') {
      return acc;
    }
    const { tablePath } = entityRepository.metadata;

    return [...acc, tablePath];
  }, []);
  const truncateTableSql = `TRUNCATE TABLE ${entityTables} CASCADE`;

  return getConnection().query(truncateTableSql);
}

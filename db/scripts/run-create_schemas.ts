import { createConnection, Connection } from 'typeorm';
import { DB_SCHEMA } from '../helpers/schemas';

let createSchemasSql = '';
for (const schemaName in DB_SCHEMA) {
  createSchemasSql += `CREATE SCHEMA IF NOT EXISTS "${DB_SCHEMA[schemaName]}";`;
}

(async () => {
  let conn: Connection;
  try {
    conn = await createConnection();
    await conn.query(createSchemasSql);
  } catch (error) {
    console.error(error);
  } finally {
    conn.close();
  }
})();

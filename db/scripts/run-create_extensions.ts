import { Connection, createConnection } from 'typeorm';

const extensions = ['pgcrypto'];
const createExtensionsSql = extensions.reduce((sql, extensionItem) => {
  return `CREATE EXTENSION IF NOT EXISTS "${extensionItem}";${sql}`;
}, '');

(async () => {
  let conn: Connection;
  try {
    conn = await createConnection();
    await conn.query(createExtensionsSql);
  } catch (error) {
    console.error(error);
  } finally {
    conn.close();
  }
})();

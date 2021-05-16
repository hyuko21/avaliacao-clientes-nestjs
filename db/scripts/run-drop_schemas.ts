import { DB_SCHEMA } from '../helpers/schemas';
import { createConnection, Connection } from 'typeorm';

const schemas = `'${Object.values(DB_SCHEMA).join("','")}'`;

const dropViewsSql = `SELECT 'DROP VIEW IF EXISTS "' || schemaname || '"."' || viewname || '" CASCADE;' as "query"
  FROM "pg_views" WHERE "schemaname" IN (${schemas}) AND "viewname" NOT IN (
    'geography_columns', 'geometry_columns', 'raster_columns', 'raster_overviews'
  )`;
const dropTablesSql = `SELECT 'DROP TABLE IF EXISTS "' || schemaname || '"."' || tablename || '" CASCADE;' as "query"
  FROM "pg_tables" WHERE "schemaname" IN (${schemas}) AND "tablename" NOT IN ('spatial_ref_sys')`;
const dropTypesSql = `SELECT 'DROP TYPE IF EXISTS "' || n.nspname || '"."' || t.typname || '" CASCADE;' as "query"
  FROM "pg_type" "t"
  INNER JOIN "pg_enum" "e" ON "e"."enumtypid" = "t"."oid"
  INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace"
  WHERE "n"."nspname" IN (${schemas}) GROUP BY "n"."nspname", "t"."typname"`;

(async () => {
  let conn: Connection;
  try {
    conn = await createConnection();
    await conn.query('START TRANSACTION');

    const queries = [
      ...(await conn.query(dropViewsSql)),
      ...(await conn.query(dropTablesSql)),
      ...(await conn.query(dropTypesSql)),
    ];

    await conn.query(queries.reduce((sql, { query }) => `${sql}${query}`, ''));

    await conn.query('COMMIT');
  } catch (error) {
    console.error(error);
  } finally {
    conn.close();
  }
})();

export type ForeignKeyOptions = {
  name?: string;
  schema?: string;
  table: string;
  fields: string[];
  ref: {
    schema?: string;
    table: string;
    field?: string;
  };
  onDelete?: string;
  onUpdate?: string;
};

export function addForeignKeySql(options: ForeignKeyOptions) {
  const {
    schema = 'public',
    table,
    fields,
    onDelete = 'CASCADE',
    onUpdate = 'CASCADE',
  } = options;

  const fkRef = options.ref;
  if (!fkRef.field) {
    fkRef.field = 'id';
  }

  let fkName = options.name;
  if (!fkName) {
    fkName = `fk_${table}_${fkRef.table}_${fkRef.field}`;
  }

  const tablePath = `"${schema}"."${table}"`,
    fkRefTablePath = `"${fkRef.schema || 'public'}"."${fkRef.table}"`;

  return `ALTER TABLE ${tablePath}
    ADD CONSTRAINT "${fkName}"
    FOREIGN KEY ("${fields.join('","')}") REFERENCES ${fkRefTablePath}("${
    fkRef.field
  }")
    ON DELETE ${onDelete} ON UPDATE ${onUpdate}`;
}

export function dropForeignKeySql(options: ForeignKeyOptions) {
  const tableName = options.table;
  const tablePath = `"${options.schema || 'public'}"."${tableName}"`;

  const fkRef = options.ref;
  if (!fkRef.field) {
    fkRef.field = 'id';
  }

  let fkName = options.name;
  if (!fkName) {
    fkName = `fk_${tableName}_${fkRef.table}_${fkRef.field}`;
  }
  return `ALTER TABLE ${tablePath} DROP CONSTRAINT "${fkName}"`;
}

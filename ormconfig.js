module.exports = [
  {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'dev',
    password: 'dev',
    database: 'dev',

    logging: true,

    migrations: ['db/migrations/**/*.ts'],

    cli: {
      migrationsDir: 'db/migrations',
    },
  },
];

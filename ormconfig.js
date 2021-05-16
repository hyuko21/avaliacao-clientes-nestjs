module.exports = [
  {
    type: 'postgres',
    host: 'localhost',
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

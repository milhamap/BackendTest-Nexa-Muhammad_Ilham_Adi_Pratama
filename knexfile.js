// Update with your config settings.
require('dotenv').config()
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DBHOST_DEV,
      port: process.env.DBPORT_DEV,
      user: process.env.DBUSER_DEV,
      password: process.env.DBPASSWORD_DEV,
      database: process.env.DBDATABASE_DEV,
    },
    migrations: {
      directory: './src/databases/migrations'
    },
    seeds: {
      directory: './src/databases/seeds'
    },
  },
};

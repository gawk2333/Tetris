const path = require('path')
require('dotenv').config()
console.log('env', process.env.DATABASE_PORT)

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:'
    },
    migrations: {
      directory: path.join(__dirname, 'migrations')
    },
    seeds: {
      directory: path.join(__dirname, 'seeds')
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: {
      host: process.env.DATABASE_URL,
      port: process.env.DATABASE_PORT,
      ssl: { rejectUnauthorized: false },
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    acquireConnectionTimeout: 10000
  }
}

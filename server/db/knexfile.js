const path = require('path')
require('dotenv').config()
console.log(process.env.DATABASE_URL)

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
      host: 'database-3.cxekl5ujmctl.ap-southeast-2.rds.amazonaws.com',
      port: process.env.DATABASE_PORT,
      ssl: { rejectUnauthorized: false },
      user: 'postgres',
      password: 'wps1029343264',
      database: 'tetris'
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

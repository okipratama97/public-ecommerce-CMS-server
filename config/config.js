if (process.env.NODE_ENV !== 'production') require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DEV_DATABASE_USERNAME,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_DATABASE,
    host: process.env.DEV_DATABASE_HOST,
    dialect: 'postgres',
  },
  test: {
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_DATABASE,
    host: process.env.TEST_DATABASE_HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
}

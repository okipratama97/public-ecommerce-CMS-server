if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test')
  require('dotenv').config()

module.exports = {
  development: {
    username: 'tugas',
    password: 'tugas',
    database: 'ecommerce-cms-dev',
    host: 'localhost',
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

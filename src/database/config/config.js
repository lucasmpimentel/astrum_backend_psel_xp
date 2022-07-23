require('dotenv').config();

/* const environment = process.env.NODE_ENV || 'test';

const suffix = {
  dev: '-dev',
  development: '-dev',
  test: '-test',
}; */

const options = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
};

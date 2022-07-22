require('dotenv').config();

const options = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dialect: 'postgres',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: '',
};

module.exports = options;
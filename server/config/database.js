require('dotenv').config();

const config = {
  driver: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

module.exports = config;
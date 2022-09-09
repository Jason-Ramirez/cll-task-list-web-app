const config = require('../config/database');

const connection = {
  host: config.host,
  user: config.username,
  password: config.password,
  database: config.database
};

const knex = require('knex')({
  client: config.driver,
  connection: connection
});

module.exports = { knex }
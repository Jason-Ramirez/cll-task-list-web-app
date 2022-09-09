const bcrypt = require('bcryptjs');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'Jason', last_name: 'Ramirez', email: 'ramirezjason392@gmail.com', password: bcrypt.hashSync('password', 10) },
  ]);
};

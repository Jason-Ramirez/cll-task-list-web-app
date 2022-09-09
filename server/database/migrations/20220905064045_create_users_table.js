/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id');
      table.string('first_name').notNullable();
      table.string('last_name').notNullable();
      table.string('email').unique().notNullable();
      table.text('password').notNullable();
      table.json('roles').notNullable().defaultTo('["user"]');
      table.json('permissions').notNullable().defaultTo('["read:own_account"]');
      table.timestamp('updated_at'); // defaults to CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('users');
};

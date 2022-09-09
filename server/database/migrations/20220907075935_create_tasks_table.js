/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
  return knex.schema
    .createTable('tasks', function (table) {
      table.increments('id');
      table.integer('user_id').unsigned().notNullable()
      table.text('note').notNullable();
      table.timestamp('updated_at'); // defaults to CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      table.timestamp('created_at').defaultTo(knex.fn.now());

      table.foreign('user_id').references('users.id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  await knex('tasks').del();

  const defaultUser = await knex('users').where('email', 'ramirezjason392@gmail.com').first();

  await knex('tasks').insert([
    { user_id: defaultUser.id, note: 'task one' },
    { user_id: defaultUser.id, note: 'task two' },
    { user_id: defaultUser.id, note: 'task three' }
  ]);
};

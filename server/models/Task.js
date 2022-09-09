const { knex } = require('../database');

const attributes = [
  'id',
  'user_id',
  'note',
  'updated_at',
  'created_at',
]

const all = async () => {
  return await knex('tasks').select();
}

const getById = async (id) => {
  try {
    return await knex('tasks').where('id', id).first();
  } catch (error) {
    return null;
  }
}

const getByUserId = async (userId) => {
  try {
    const tasks = await knex('tasks').where('user_id', userId).select();
    return tasks;
  } catch (error) {
    return null;
  }
}

const create = async (user_id, note) => {
  try {
    const id = await knex('tasks').insert({ note, user_id });
    return await getById(id);
  } catch (error) {
    return null;
  }
}

const update = async (data) => {
  try {
    await knex('tasks').update(data).where('id', data.id);
    return true;
  } catch (error) {
    return null;
  }
}

const del = async (id) => {
  try {
    const task = await getById(id);
    await knex('tasks').where('id', id).del();
    return task;
  } catch (error) {
    return null;
  }
}

const query = {
  all,
}

const mutation = {
  create: async (_, args) => create(args.note),
  update: async (_, args) => update(args),
  delete: async (_, args) => del(args.id),
}

module.exports = {
  query,
  mutation,

  create,
  update,
  delete: del,
  getByUserId,
}
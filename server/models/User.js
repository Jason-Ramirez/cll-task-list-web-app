const jwt = require("jsonwebtoken");
const { knex } = require('../database');
const bcrypt = require('bcryptjs');
const appConfig = require('../config/app');

const attributes = [
  'id',
  'first_name',
  'last_name',
  'email',
  'password',
  'roles',
  'permissions',
  'updated_at',
  'created_at',
]
    
const hidden = ['password'];

const visible = attributes.filter(attr => !hidden.includes(attr));

const isTokenValid = async (token) => {
  const decodedToken = jwt.verify(token, appConfig.secret);
  const userId = decodedToken?.sub;
  const user = await getById(userId);
  return user ? true : false;
}

const all = async () => {
  try {
    return await knex('users').select(...visible);
  } catch (error) {
    return null;
  }
}

const getById = async (id) => {
  try {
    return await knex('users').where('id', id).first(...visible);
  } catch (error) {
    return null;
  }
}

const getByEmail = async (email) => {
  try {
    return await knex('users').where('email', email).first(...visible);
  } catch (error) {
    return null;
  }
}

const getPassword = async (id) => {
  try {
    const result = await knex('users').where('id', id).first('password');
    return result.password;
  } catch (error) {
    return null;
  }
}

const create = async (data) => {
  try {
    data.password = bcrypt.hashSync(data.password, 10);
    await knex('users').insert([data]);
    const user = await getByEmail(data.email);
    return user;
  } catch (error) {
    return null;
  }
}

const update = async (data) => {
  try {
    data.password = bcrypt.hashSync(data.password, 10);
    await knex('users').update(data).where('id', data.id);
    return await getById(data.id);
  } catch (error) {
    return null;
  }
}

const del = async (id) => {
  try {
    const user = await getById(id);
    await knex('users').where('id', id).del();
    return user;
  } catch (error) {
    return null;
  }
}

const query = {
  all,
}

const mutation = {
  create: async (_, args) => create(args),
  update: async (_, args) => update(args),
  delete: async (_, args) => del(args.id),
}

module.exports = {
  query,
  mutation,

  all,
  getById,
  getByEmail,
  getPassword,
  isTokenValid,
  create,
}
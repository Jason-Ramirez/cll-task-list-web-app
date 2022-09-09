const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const appConfig = require('../../config/app');
const User = require('../../models/User');

const login = async (email, password) => {
  const user = await User.getByEmail(email);
  if (!user) return false;
  const hashedPassword = await User.getPassword(user.id);
  const validPassword = await bcrypt.compare(password, hashedPassword);
  if (!validPassword) return false;
  const roles = user.roles;
  const permissions = user.permissions;
  const token = jwt.sign(
    { [appConfig.url]: { roles, permissions } },
    appConfig.secret,
    { algorithm: "HS256", subject: user.id.toString(), expiresIn: "1d" }
  );
  return { token, user };
}

const query = {
  auth: async (parent, args, { user }) => {
    if (!user) return null;
    authUser = await User.getById(user?.sub);
    return authUser;
  }
}

const mutation = {
  login: async (_, { email, password }) => login(email, password),
}

module.exports = { 
  query,
  mutation,

  login,
};
const User = require('../../models/User');
const auth = require('../../schema/resolvers/auth');

const login = async (request, response, next) => {
  const { email, password } = request.body;
  if (email && password) {
    const user = await auth.login(email, password);
    if (user) {
      return response.send({ success: true, data: user, });
    }
  }
  return response.send({ success: false, error: "Invalid Credentials." });
}

const validateToken = async (request, response, next) => {
  const { token } = request.body;
  const isValid = await User.isTokenValid(token);
  return response.send({ success: true, data: { is_token_valid: isValid } });
}

const register = async (request, response, next) => {
  try {
    const { first_name, last_name, email, password } = request.body;
    if (!(first_name && last_name && email && password)) {
      throw new Error('Bad Request!');
    }
    const user = await User.create(request.body);
    if (user) return response.send({ success: true, data: { user } });
    throw new Error('Bad Request!');
  } catch (error) {
    return response.status(400).send();
  }
}

module.exports = {
  login,
  validateToken,
  register
}
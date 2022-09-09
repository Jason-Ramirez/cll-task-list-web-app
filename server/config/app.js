require('dotenv').config();

const config = {
  url: process.env.APP_URL || 'http://localhost:4000',
  port: process.env.PORT || '4000',
  node_env: process.env.NODE_ENV || 'development',
  secret: process.env.APP_SECRET,
  frontend_url: process.env.FRONTEND_URL || 'http://localhost:3000',
};

module.exports = config;
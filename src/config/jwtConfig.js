require('dotenv').config("../.env");
console.log(process.env.JWT_SECRET)
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'fallback_secret',
  TOKEN_EXPIRES_IN: '1h',
};

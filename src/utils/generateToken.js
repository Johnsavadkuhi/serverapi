const jwt = require('jsonwebtoken');
const { JWT_SECRET, TOKEN_EXPIRES_IN } = require('../config/jwtConfig');

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
};

module.exports = generateToken;

require("dotenv").config({path:"../../.env"})
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Get token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided. Unauthorized.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

module.exports = { verifyToken };


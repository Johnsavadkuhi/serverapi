const { verifyToken } = require('../utils/jwt');

function authMiddleware(req, res, next) {
    
  const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    req.user = verifyToken(token);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
}

module.exports = authMiddleware;

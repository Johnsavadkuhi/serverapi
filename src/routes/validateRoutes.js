const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken'); 

router.get('/validatesession', verifyToken, (req, res) => {
  res.json({ user: req.user }); // return some basic user info
});

module.exports = router;

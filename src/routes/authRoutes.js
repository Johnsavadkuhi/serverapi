const express = require('express');
const { login, registerUser , logout } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post("/register" , registerUser)
router.post("/logout" , logout )

module.exports = router;

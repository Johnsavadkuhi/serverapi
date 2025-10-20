const express = require('express');
const { addAsset } = require('../controllers/assetsController');
const router = express.Router();


router.post("/create" , addAsset)


module.exports = router;
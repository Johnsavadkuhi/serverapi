const express = require('express');
const { addAsset , getAssets, getAsset } = require('../controllers/assetsController');
const router = express.Router();


router.post("/create" , addAsset)
router.post("/" ,getAssets)
router.get("/details" , getAsset)
module.exports = router;
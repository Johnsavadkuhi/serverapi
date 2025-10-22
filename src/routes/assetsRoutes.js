const express = require('express');
const { addAsset , getAssets, getAsset , updateAsset, deleteAsset } = require('../controllers/assetsController');
const router = express.Router();


router.post("/create" , addAsset)
router.post("/update" , updateAsset)
router.post("/" ,getAssets)
router.get("/details" , getAsset)
router.post("/delete" , deleteAsset)
module.exports = router;
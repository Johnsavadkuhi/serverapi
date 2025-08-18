const express = require('express');
const { saveWebOwaspWstg , getAllOwaspWeb , saveImpactsWeb , getOwaspItemById } = require('../controllers/owaspController');

const router = express.Router();

router.get('/save/web', saveWebOwaspWstg);
// router.post("/mobile" , registerUser)
router.get('/web' ,getAllOwaspWeb )
router.get("/save/impacts/web" , saveImpactsWeb)
router.get("/impact" , getOwaspItemById)
module.exports = router;

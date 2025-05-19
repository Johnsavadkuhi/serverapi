const express = require('express');
const { saveWebOwaspWstg , getAllOwaspWeb} = require('../controllers/owaspController');

const router = express.Router();

router.get('/save/web', saveWebOwaspWstg);
// router.post("/mobile" , registerUser)
router.get('/web' ,getAllOwaspWeb )
module.exports = router;

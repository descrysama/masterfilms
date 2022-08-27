const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const Middle = require('../middlewares/authenticateToken')

router.post('/create', filmController.create);
router.post('/destroy', filmController.destroy);
router.get('/getmyfilms', filmController.getmyfilms);
router.post('/getuserfilms', filmController.getuserfilms)

module.exports = router;
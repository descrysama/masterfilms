const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const Middle = require('../middlewares/authenticateToken')

router.post('/create', filmController.create);
router.get('/getmyfilms', filmController.getmyfilms);

module.exports = router;
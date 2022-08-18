const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Middle = require('../middlewares/authenticateToken')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/update', Middle.authToken, userController.update);

module.exports = router;
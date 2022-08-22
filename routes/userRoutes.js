const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const Middle = require('../middlewares/authenticateToken')

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/update', Middle.authToken, userController.update);
router.post('/logout', userController.logout)










router.post('/checktoken', userController.checkToken);

module.exports = router;
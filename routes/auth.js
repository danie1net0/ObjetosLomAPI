const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const AuthController = require('../controllers/auth/AuthController');

router.post('/login', AuthController.login);

router.post('/forgot-password', AuthController.forgotPassword);
router.put('/reset-password', AuthController.resetPassword);

module.exports = router;

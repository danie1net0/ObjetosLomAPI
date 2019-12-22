const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth/AuthController');

router.post('/login', AuthController.login);

router.post('/forgot-password', AuthController.forgotPassword);
router.get('/password-token/:token', AuthController.verifyToken);
router.put('/reset-password', AuthController.resetPassword);

module.exports = router;

const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const AccepptUserController = require('../../controllers/user/AccepptUserController');

router.put('/:id', authMiddleware, AccepptUserController.accepptUser);

module.exports = router;

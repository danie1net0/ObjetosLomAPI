const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const roleMiddleware = require('../../middlewares/role');
const AccepptUserController = require('../../controllers/user/AccepptUserController');

router.put('/:id', authMiddleware, roleMiddleware.grantAccess('updateAny', 'user'), AccepptUserController.accepptUser);

module.exports = router;

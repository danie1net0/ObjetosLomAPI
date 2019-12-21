const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middlewares/auth');
const roleMiddleware = require('../../middlewares/role');
const UserRoleController = require('../../controllers/user/UserRoleController');

router.put('/:id', authMiddleware, roleMiddleware.grantAccess('updateAny', 'user'), UserRoleController.update);

module.exports = router;

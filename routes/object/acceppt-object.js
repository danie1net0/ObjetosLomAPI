const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const roleMiddleware = require('../../middlewares/role');
const AccepptObjectController = require('../../controllers/object/AccepptObjectController');

router.put('/:id', authMiddleware, roleMiddleware.grantAccess('updateAny', 'object'), AccepptObjectController.accepptObject);

module.exports = router;

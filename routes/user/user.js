const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const roleMiddleware = require('../../middlewares/role');
const UserController = require('../../controllers/user/UserController');

router.get('/', authMiddleware, roleMiddleware.grantAccess('readAny', 'user'), UserController.index);
router.get('/:id', authMiddleware, roleMiddleware.grantAccess('readOwn', 'user'), UserController.show);
router.post('/', UserController.store);
router.put('/:id', authMiddleware, roleMiddleware.grantAccess('updateOwn', 'user'), UserController.update);
router.delete('/:id', authMiddleware, roleMiddleware.grantAccess('deleteAny', 'user'), UserController.destroy);

module.exports = router;

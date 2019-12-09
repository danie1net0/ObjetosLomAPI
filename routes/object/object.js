const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const roleMiddleware = require('../../middlewares/role');
const ObjectController = require('../../controllers/object/ObjectController');

router.get('/', ObjectController.index);
router.get('/:id', ObjectController.show);
router.post('/', authMiddleware, roleMiddleware.grantAccess('createOwn', 'object'), ObjectController.store);
router.put('/:id', authMiddleware, roleMiddleware.grantAccess('updateAny', 'object'), ObjectController.update);
router.delete('/:id', authMiddleware, roleMiddleware.grantAccess('deleteAny', 'object'), ObjectController.destroy);

module.exports = router;

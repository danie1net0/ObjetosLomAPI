const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const ObjectController = require('../../controllers/object/ObjectController');

router.get('/', ObjectController.index);
router.get('/:id', ObjectController.show);
router.post('/', authMiddleware, ObjectController.store);
router.put('/:id', authMiddleware, ObjectController.update);
router.delete('/:id', authMiddleware, ObjectController.destroy);

module.exports = router;

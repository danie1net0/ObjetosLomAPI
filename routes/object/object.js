const express = require('express');
const router = express.Router();
const ObjectController = require('../../controllers/object/ObjectController');

router.get('/', ObjectController.index);
router.get('/:id', ObjectController.show);
router.post('/', ObjectController.store);
router.put('/:id', ObjectController.update);
router.delete('/:id', ObjectController.destroy);

module.exports = router;

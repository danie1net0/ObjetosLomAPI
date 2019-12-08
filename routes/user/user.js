const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user/UserController');

router.get('/', authMiddleware, UserController.index);
router.get('/:id', authMiddleware, UserController.show);
router.post('/', UserController.store);
router.put('/:id', authMiddleware, UserController.update);
router.delete('/:id', authMiddleware, UserController.destroy);

module.exports = router;

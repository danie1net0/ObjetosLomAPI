const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth');
const AccepptObjectController = require('../../controllers/object/AccepptObjectController');

router.put('/:id', authMiddleware, AccepptObjectController.accepptObject);

module.exports = router;

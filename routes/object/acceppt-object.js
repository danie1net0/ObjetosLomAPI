const express = require('express');
const router = express.Router();
const AccepptObjectController = require('../../controllers/object/AccepptObjectController');

router.put('/:id', AccepptObjectController.accepptObject);

module.exports = router;

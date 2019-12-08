const express = require('express');
const router = express.Router();
const AccepptUserController = require('../../controllers/user/AccepptUserController');

router.put('/:id', AccepptUserController.accepptUser);

module.exports = router;

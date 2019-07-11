const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/api/users/signup', usersController.signup);

module.exports = router;
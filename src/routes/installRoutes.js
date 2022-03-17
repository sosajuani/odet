const express = require('express');
const router = express.Router();
const installController = require('./installController');

router.get('/',installController.home);

module.exports = router;
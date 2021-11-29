const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/',adminController.home)
router.get('/config',adminController.config)

module.exports = router;
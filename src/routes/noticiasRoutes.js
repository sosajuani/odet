const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/:id',mainController.noticiaVista)

module.exports = router;
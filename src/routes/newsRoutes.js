const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/detail/:id',newsController.newsRead)

module.exports = router;
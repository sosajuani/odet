const express = require('express');
const router = express.Router();
const adminFixtureController = require('../../controllers/admin/adminFixtureController');
const authMiddleware = require('../../middleware/authMiddleware')
const validation = require('../../middleware/validation')

//admin desarrollo
router.get('/',adminFixtureController.home)
router.get('/filter',adminFixtureController.filterTourDiv)
router.post('/automatic',adminFixtureController.fixtureAutomatico)

module.exports = router;
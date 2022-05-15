const express = require('express');
const router = express.Router();
const adminFixtureController = require('../../controllers/admin/adminFixtureController');
const authMiddleware = require('../../middleware/authMiddleware')
const validation = require('../../middleware/validation')

//admin desarrollo
router.get('/',adminFixtureController.home)
router.get('/automatico',adminFixtureController.fixtureAutomatico)
router.post('/byHand',adminFixtureController.fixtureByHand)

module.exports = router;
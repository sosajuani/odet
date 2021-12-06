const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');

router.get('/',adminController.home)
router.get('/config',adminController.config)
router.get('/players',adminController.players)
router.get('/teams',adminController.teams)
router.get('/roles',adminController.roles)
router.get('/tournament',adminController.tournament)
router.get('/tournament/:tournament',adminController.tournamentIndividual)
router.get('/divisions',adminController.divisions)
router.get('/info',adminController.info)

module.exports = router;
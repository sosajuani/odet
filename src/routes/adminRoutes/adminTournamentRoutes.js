const express = require('express');
const router = express.Router();
const adminTournamentController = require('../../controllers/admin/adminTournamentController');
const authMiddleware = require('../../middleware/authMiddleware')
const validationTournament = require('../../middleware/tournamentValidation')

//admin desarrollo
router.get('/',adminTournamentController.tournament)
router.get('/:tournament/detail',adminTournamentController.tournamentIndividual)
router.get('/new',adminTournamentController.newTournament)
router.post('/new',validationTournament.validationCreate,adminTournamentController.newTournamentProcess)


//admin con permisos

// router.get('/tournament',authMiddleware.logged,authMiddleware.admin,adminTournamentController.tournament)
// router.get('/tournament/:tournament',authMiddleware.logged,authMiddleware.admin,adminTournamentController.tournamentIndividual)
//router.get('/new',authMiddleware.logged,authMiddleware.admin,adminTournamentController.newTournament)
//router.post('/new',validationTournament.validationCreate,authMiddleware.logged,authMiddleware.admin,adminTournamentController.newTournament)


module.exports = router;
const express = require('express');
const router = express.Router();
const adminTournamentController = require('../../controllers/admin/adminTournamentController');
const authMiddleware = require('../../middleware/authMiddleware')

//admin desarrollo
router.get('/',adminTournamentController.tournament)
router.get('/:tournament/detail',adminTournamentController.tournamentIndividual)
router.get('/new',adminTournamentController.newTournament)


//admin con permisos

// router.get('/tournament',authMiddleware.logged,authMiddleware.admin,adminTournamentController.tournament)
// router.get('/tournament/:tournament',authMiddleware.logged,authMiddleware.admin,adminTournamentController.tournamentIndividual)


module.exports = router;
const express = require('express');
const router = express.Router();
const adminTeamsController = require('../../controllers/admin/adminTeamsController');
const authMiddleware = require('../../middleware/authMiddleware')
const validationTournament = require('../../middleware/tournamentValidation')

//admin desarrollo
router.get('/',adminTeamsController.home)
router.get('/search',adminTeamsController.search)
router.get('/new',adminTeamsController.create)

//admin con permisos
//router.get('/',validationTournament.validationCreate,authMiddleware.logged,adminTeamsController.home)
// router.get('/search',validationTournament.validationCreate,authMiddleware.logged,adminTeamsController.search)
// router.get('/new',validationTournament.validationCreate,authMiddleware.logged,adminTeamsController.create)



//router.post('/new',validationTournament.validationCreate,authMiddleware.logged,authMiddleware.admin,adminTournamentController.newTournamentProcess)
//router.get('/:tournament/edit',authMiddleware.logged,authMiddleware.admin,adminTournamentController.editTournament)
//router.update('/:tournament/edit',validationTournament.validationCreate,authMiddleware.logged,authMiddleware.admin,adminTournamentController.editTournamentProcess)
//router.delete('/:id/delete',authMiddleware.logged,authMiddleware.admin,adminTournamentController.deleteTournament)

module.exports = router;
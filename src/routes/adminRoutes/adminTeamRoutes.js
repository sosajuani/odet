const express = require('express');
const router = express.Router();
const adminTeamsController = require('../../controllers/admin/adminTeamsController');
const authMiddleware = require('../../middleware/authMiddleware')
const validationTournament = require('../../middleware/tournamentValidation')

//admin desarrollo
router.get('/',adminTeamsController.home)

//admin con permisos
//router.get('/',validationTournament.validationCreate,authMiddleware.logged,adminTeamsController.home)



//router.post('/new',validationTournament.validationCreate,authMiddleware.logged,authMiddleware.admin,adminTournamentController.newTournamentProcess)
//router.get('/:tournament/edit',authMiddleware.logged,authMiddleware.admin,adminTournamentController.editTournament)
//router.update('/:tournament/edit',validationTournament.validationCreate,authMiddleware.logged,authMiddleware.admin,adminTournamentController.editTournamentProcess)
//router.delete('/:id/delete',authMiddleware.logged,authMiddleware.admin,adminTournamentController.deleteTournament)

module.exports = router;
const express = require('express');
const router = express.Router();
const adminTeamsController = require('../../controllers/admin/adminTeamsController');
const upload = require("../../middleware/multer")
const authMiddleware = require('../../middleware/authMiddleware')
const validation = require('../../middleware/validation')

//admin desarrollo
router.get('/',adminTeamsController.home)
router.get('/search',adminTeamsController.search)
router.get('/search/div',adminTeamsController.searchDivTour)
router.get('/new',adminTeamsController.create)
router.post('/new',upload.single("img"),validation.createTeam,adminTeamsController.createProcess)
router.get('/edit/:id',upload.single("img"),validation.createTeam,adminTeamsController.edit)
router.put('/edit/:id',upload.single("img"),validation.createTeam,adminTeamsController.editProcess)

//admin con permisos
//router.get('/',authMiddleware.logged,authMiddleware.admin,adminTeamsController.home)
// router.get('/search',authMiddleware.logged,authMiddleware.admin,adminTeamsController.search)
// router.get('/search/div',authMiddleware.logged,authMiddleware.admin,adminTeamsController.search)
// router.get('/new',authMiddleware.logged,authMiddleware.admin,adminTeamsController.create)
// router.post('/new',upload.single("img"),validation.createTeam,authMiddleware.logged,authMiddleware.admin,adminTeamsController.create)
// router.get('/edit',upload.single("img"),validation.createTeam,authMiddleware.logged,authMiddleware.admin,adminTeamsController.create)
// router.put('/edit',upload.single("img"),validation.createTeam,authMiddleware.logged,authMiddleware.admin,adminTeamsController.create)



//router.post('/new',validationTournament.validationCreate,authMiddleware.logged,authMiddleware.admin,adminTournamentController.newTournamentProcess)
//router.get('/:tournament/edit',authMiddleware.logged,authMiddleware.admin,adminTournamentController.editTournament)
//router.update('/:tournament/edit',validationTournament.validationCreate,authMiddleware.logged,authMiddleware.admin,adminTournamentController.editTournamentProcess)
//router.delete('/:id/delete',authMiddleware.logged,authMiddleware.admin,adminTournamentController.deleteTournament)

module.exports = router;
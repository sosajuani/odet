const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const adminHomeController = require('../../controllers/admin/adminHomeController');
const authMiddleware = require('../../middleware/authMiddleware')
const validation = require('../../middleware/validation')
const uploadBanner = require("../../middleware/multer/uploadBanner")

//admin desarrollo
router.get('/',adminHomeController.home)
router.post('/uploadBanner',uploadBanner.single("img"),validation.uploadImage,adminHomeController.uploadBanner)
router.get('/news',adminController.news)

router.get('/news/create',adminController.newsCreate)
router.post('/news/create',adminController.newsCreateProcess)
router.get('/news/:id/edit',adminController.newsEdit)
router.put('/news/:id/edit',adminController.newsEditProcess)
router.delete('/news/:id/delete',adminController.newsDelete)

router.get('/config',adminController.config)
router.get('/players',adminController.players)
router.get('/roles',adminController.roles)

router.get('/divisions',adminController.divisions)
router.get('/divisions/new',adminController.divisionsNew)
router.post('/divisions/new',validation.divisionCreate,adminController.divisionsNewProcess)
router.get('/division/:id/detail',adminController.divisionDetail)
router.delete('/division/:id/delete',adminController.deleteDivision)
router.get('/division/:id/edit',adminController.divisionEdit)
router.put('/division/:id/edit',validation.divisionEdit,adminController.divisionsEditProcess)

router.get('/info',adminController.info)

//admin con permisos

// router.get('/',authMiddleware.logged,authMiddleware.admin,adminController.home)
// router.get('/news',authMiddleware.logged,authMiddleware.admin,adminController.news)

// router.get('/news/create',authMiddleware.logged,authMiddleware.admin,adminController.newsCreate)
// router.post('/news/create',authMiddleware.logged,authMiddleware.admin,adminController.newsCreateProcess)
// router.get('/news/:id/edit',authMiddleware.logged,authMiddleware.admin,adminController.newsEdit)
// router.put('/news/:id/edit',authMiddleware.logged,authMiddleware.admin,adminController.newsEditProcess)
// router.delete('/news/:id/delete',authMiddleware.logged,authMiddleware.admin,adminController.newsDelete)

// router.get('/config',authMiddleware.logged,authMiddleware.admin,adminController.config)
// router.get('/players',authMiddleware.logged,authMiddleware.admin,adminController.players)
// router.get('/teams',authMiddleware.logged,authMiddleware.admin,adminController.teams)
// router.get('/roles',authMiddleware.logged,authMiddleware.admin,adminController.roles)

// router.get('/divisions',authMiddleware.logged,authMiddleware.admin,adminController.divisions)
// router.get('/divisions/new',authMiddleware.logged,authMiddleware.admin,adminController.divisionsNew)
// router.post('/divisions/new',validation.divisionCreate,authMiddleware.logged,authMiddleware.admin,adminController.divisionsNewProcess)
// router.get('/division/:id/detail',authMiddleware.logged,authMiddleware.admin,adminController.divisionsNew)
// router.get('/division/:id/edit',authMiddleware.logged,authMiddleware.admin,adminController.divisionEdit)
// router.put('/division/:id/edit',validation.divisionEdit,authMiddleware.logged,authMiddleware.admin,adminController.divisionsEditProcess)
// router.delete('/division/:id/delete',authMiddleware.logged,authMiddleware.admin,adminTournamentController.deleteTournament)

// router.get('/info',authMiddleware.logged,authMiddleware.admin,adminController.info)

module.exports = router;
const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');
const authMiddleware = require('../../middleware/authMiddleware')

//admin desarrollo
router.get('/',adminController.home)
router.get('/news',adminController.news)

router.get('/news/create',adminController.newsCreate)
router.post('/news/create',adminController.newsCreateProcess)
router.get('/news/:id/edit',adminController.newsEdit)
router.put('/news/:id/edit',adminController.newsEditProcess)
router.delete('/news/:id/delete',adminController.newsDelete)

router.get('/config',adminController.config)
router.get('/players',adminController.players)
router.get('/teams',adminController.teams)
router.get('/roles',adminController.roles)

router.get('/divisions',adminController.divisions)
router.get('/divisions/new',adminController.divisionsNew)
router.post('/divisions/new',adminController.divisionsNewProcess)

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
// router.get('/tournament',authMiddleware.logged,authMiddleware.admin,adminController.tournament)
// router.get('/tournament/:tournament',authMiddleware.logged,authMiddleware.admin,adminController.tournamentIndividual)
// router.get('/divisions',authMiddleware.logged,authMiddleware.admin,adminController.divisions)
// router.get('/divisions/new',authMiddleware.logged,authMiddleware.admin,adminController.divisionsNew)
//router.post('/divisions/new',authMiddleware.logged,authMiddleware.admin,adminController.divisionsNewProcess)

// router.get('/info',authMiddleware.logged,authMiddleware.admin,adminController.info)

module.exports = router;
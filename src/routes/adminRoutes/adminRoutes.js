const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/adminController');
const authMiddleware = require('../../middleware/authMiddleware')

router.get('/',authMiddleware.logged,authMiddleware.admin,adminController.home)
router.get('/news',authMiddleware.logged,authMiddleware.admin,adminController.news)

router.get('/news/create',authMiddleware.logged,authMiddleware.admin,adminController.newsCreate)
router.post('/news/create',authMiddleware.logged,authMiddleware.admin,adminController.newsCreateProcess)
router.get('/news/:id/edit',authMiddleware.logged,authMiddleware.admin,adminController.newsEdit)
router.put('/news/:id/edit',authMiddleware.logged,authMiddleware.admin,adminController.newsEditProcess)
router.delete('/news/:id/delete',authMiddleware.logged,authMiddleware.admin,adminController.newsDelete)

router.get('/config',authMiddleware.logged,authMiddleware.admin,adminController.config)
router.get('/players',authMiddleware.logged,authMiddleware.admin,adminController.players)
router.get('/teams',authMiddleware.logged,authMiddleware.admin,adminController.teams)
router.get('/roles',authMiddleware.logged,authMiddleware.admin,adminController.roles)
router.get('/tournament',authMiddleware.logged,authMiddleware.admin,adminController.tournament)
router.get('/tournament/:tournament',authMiddleware.logged,authMiddleware.admin,adminController.tournamentIndividual)
router.get('/divisions',authMiddleware.logged,authMiddleware.admin,adminController.divisions)
router.get('/info',authMiddleware.logged,authMiddleware.admin,adminController.info)

module.exports = router;
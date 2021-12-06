const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/',mainController.home);
router.get('/tournament',mainController.tournament);
router.get('/teams',mainController.teams);
router.get('/fixture',mainController.fixture);
router.get('/login',mainController.login);
router.get('/register',mainController.register);
router.get('/perfil',mainController.perfil);

module.exports = router;
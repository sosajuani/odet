const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const validatorMiddleware = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware")

router.get('/',mainController.home);
router.get('/pruebas',mainController.pruebas);
router.get('/tournament',mainController.tournament);
router.post('/tournament/filter',mainController.tournamentFilter);

router.get('/fixture',mainController.fixture);
router.get('/login',authMiddleware.visited,mainController.login);
router.post('/login',validatorMiddleware.validationLogin,mainController.loginProcess);
router.get('/logout',validatorMiddleware.validationLogin,mainController.logout);

module.exports = router;
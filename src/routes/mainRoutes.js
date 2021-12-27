const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const validatorMiddleware = require("../middleware/validation")

router.get('/',mainController.home);
router.get('/tournament',mainController.tournament);
router.get('/teams',mainController.teams);
router.get('/fixture',mainController.fixture);
router.get('/login',mainController.login);
router.post('/login',validatorMiddleware.validationLogin,mainController.loginProcess);
router.get('/register',mainController.register);
router.post('/register',validatorMiddleware.validationRegister,mainController.registerProcess);
router.get('/perfil',mainController.perfil);

module.exports = router;
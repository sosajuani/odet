const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const validatorMiddleware = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware")

router.get('/',mainController.home);
router.get('/tournament',mainController.tournament);
router.get('/teams',mainController.teams);
router.get('/fixture',mainController.fixture);
router.get('/login',authMiddleware.visited,mainController.login);
router.post('/login',validatorMiddleware.validationLogin,mainController.loginProcess);
router.get('/logout',validatorMiddleware.validationLogin,mainController.logout);
router.get('/register',authMiddleware.visited,mainController.register);
router.post('/register',validatorMiddleware.validationRegister,mainController.registerProcess);

module.exports = router;
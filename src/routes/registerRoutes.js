const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const validatorMiddleware = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware")

router.get('/',authMiddleware.visited,registerController.register);
router.post('/',validatorMiddleware.validationRegister,registerController.registerProcess);
router.get('/more',authMiddleware.logged,registerController.registerMore);
router.get('/searchTeam',authMiddleware.logged,registerController.registerSearchTeam);
router.post('/regTeam/:id',authMiddleware.logged,registerController.regTeamProcess);

module.exports = router;
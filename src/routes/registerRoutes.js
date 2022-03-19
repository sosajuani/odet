const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');
const validatorMiddleware = require("../middleware/validation");
const authMiddleware = require("../middleware/authMiddleware")

router.get('/',authMiddleware.visited,registerController.register);
router.post('/',validatorMiddleware.validationRegister,registerController.registerProcess);
router.get('/more',authMiddleware.visited,registerController.registerMore);
router.post('/more',authMiddleware.visited,registerController.registerMoreProcess);
router.post('/searchTeam',authMiddleware.visited,registerController.registerSearchTeam);

module.exports = router;
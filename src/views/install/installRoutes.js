const express = require('express');
const router = express.Router();
const installController = require('./installController');

router.get('/registers',installController.registers);

//crear registros
router.post('/registers',installController.registersProcess);


module.exports = router;
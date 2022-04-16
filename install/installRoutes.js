const express = require('express');
const router = express.Router();
const installController = require('./installController');

router.get('/',installController.home);
router.get('/setup',installController.setup);
router.get('/odet-version',installController.install);
router.get('/config',installController.config);
router.post('/setupDb',installController.connectDbProcess);

//crear registros
router.post('/registers',installController.registersProcess);


module.exports = router;
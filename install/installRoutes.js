const express = require('express');
const router = express.Router();
const installController = require('./installController');

router.get('/',installController.home);
router.get('/setup',installController.setup);
router.get('/odet-version',installController.install);
router.get('/config',installController.config);
router.post('/setupDb',installController.connectDbProcess);
router.post('/odet-base',installController.odetBaseProcess);

//crear registros
router.post('/registers',installController.registersProcess);


module.exports = router;
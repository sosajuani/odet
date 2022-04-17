const express = require('express');
const router = express.Router();
const installController = require('./installController');

router.get('/',installController.home);
router.get('/setup',installController.setup);
router.get('/odet-version',installController.install);
router.get('/config',installController.config);
router.post('/setupDb',installController.connectDbProcess);
router.post('/odet-demo',installController.odetDemoProcess);
router.post('/odet-base',installController.odetBaseProcess);
router.post('/odet-admin',installController.odetBaseAdminProcess);

//dev
router.get('/demodev',installController.registersProcess);
router.get('/basedev',installController.devBaseProcess);



module.exports = router;
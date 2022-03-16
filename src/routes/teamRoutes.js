const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/pruebas',teamController.pruebas)
router.post('/pruebas',teamController.pruebasPro)

module.exports = router;
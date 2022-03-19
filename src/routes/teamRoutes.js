const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/',teamController.teams)
router.get('/:id/info',teamController.teamsDetail)

module.exports = router;
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

router.get('/',teamController.teams)
router.get('/filter',teamController.teamsFilter)
router.get('/:id/info',teamController.teamsDetail)
router.get('/:id/position',teamController.teamsDetailPosition)
router.get('/:id/players',teamController.teamsDetailPlayer)
router.get('/:id/detail',teamController.teamsDetailMore)

module.exports = router;
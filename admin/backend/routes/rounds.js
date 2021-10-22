const router = require('express').Router();
const roundsController = require('../controllers/round.controller');

router.get('/', roundsController.getList);
router.get('/:id', roundsController.get);
router.get('/game/:id', roundsController.getByGame);

router.post('/add', roundsController.create);

router.put('/update/:id', roundsController.update);
router.delete('/:id', roundsController.remove);


module.exports = router;

const router = require('express').Router();
const gamesController = require('../controllers/game.controller');


router.get('/', gamesController.getList);
router.post('/add',  gamesController.create);

router.get('/:id', gamesController.get);
router.put('/update/:id',gamesController.update);
router.delete('/:id', gamesController.remove);

module.exports = router;

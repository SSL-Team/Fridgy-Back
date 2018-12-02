const router = require('express').Router();
//
const recipeControllers = require('../controllers/recipeControllers');

router.get('/recipeDetail', recipeControllers.recipeDetail);
router.get('/recipesByMissing', recipeControllers.recipesByMissing);

module.exports = router;

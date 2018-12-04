const router = require('express').Router();

// const userControllers = require('../controllers/userControllers');
const ingredientControllers = require('../controllers/ingredientControllers');

router.post('/ingredients', ingredientControllers.addIngredients);
router.get('/ingredients', ingredientControllers.getIngredients);
router.delete('/ingredients', ingredientControllers.deleteIngredients);

module.exports = router;

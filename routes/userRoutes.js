const router = require('express').Router();

// const userControllers = require('../controllers/userControllers');
const ingredientControllers = require('../controllers/ingredientControllers');

router.post('/ingredientsFromRecipe', ingredientControllers.addIngredientsFromRecipe);
router.post('/ingredientsFromFridge', ingredientControllers.addIngredientsFromFridge);
router.get('/ingredients', ingredientControllers.getIngredients);
router.delete('/ingredients', ingredientControllers.deleteIngredients);

module.exports = router;

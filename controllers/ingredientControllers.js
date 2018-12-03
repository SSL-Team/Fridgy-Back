const models = require('../models');

const { Ingredient } = models;

module.exports.addIngredients = function addIngredientsExport(req, res) {
  console.log('REQUEST STUFF\n');
  console.log(req.body.ingredients);
  const ingredients = req.body.ingredients;

  ingredients.map((currentIngredient) => {
    console.log(currentIngredient.id);
    Ingredient.create({
      userID: req.user.id,
      ingredientNum: currentIngredient.id,
      ingredientName: currentIngredient.name,
    }).then((ingredient) => {
      console.log(`${ingredient.ingredientName} added!`);
    }).catch((reason) => {
      console.log('ERROR CREATING INGREDIENTS');
      res.json({
        where: 'error creating ingredients',
        err: reason,
      });
    });
  });
  res.json({
    msg: 'successfully added the ingredients!',
  });
};

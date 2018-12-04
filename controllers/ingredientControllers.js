/* eslint-disable prefer-destructuring */
const models = require('../models');

const { Ingredient } = models;

module.exports.addIngredients = function addIngredientsExport(req, res) {
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

module.exports.getIngredients = function getIngredientsExport(req, res) {
  Ingredient.findAll({ where: { userID: req.user.id } }).then((ingredients) => {
    res.json({
      ingredients,
    });
  }).catch((error) => {
    res.json({
      msg: 'Error!',
      err: error,
    });
  });
};

module.exports.deleteIngredients = function deleteIngredientsExport(req, res) {
  const ingredients = req.body.ingredients;
  const ingredientIds = ingredients.map(currentIngredient => currentIngredient.id);
  Ingredient.destroy({
    where: {
      userID: req.user.id,
      ingredientNum: ingredientIds,
    },
  }).then(() => {
    res.json({
      msg: 'successfully deleted items',
    });
  }).catch((error) => {
    res.json({
      msg: 'Error deleting items',
      err: error,
    });
  });
};

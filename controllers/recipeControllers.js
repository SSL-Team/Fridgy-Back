const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/',
  headers: {
    'X-Mashape-Key': 'fksswi9JFjmshqFnHPSAG6nnwVLGp1zCTMljsnLz4mNJba69KY',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
module.exports.recipesByMissing = function recipesByMissingExport(req, res) {
  instance.get('/recipes/findByIngredients', {
    params: {
      fillIngredients: 'true',
      ingredients: req.body.ingredients,
      number: '10',
      ranking: '2',
    },
  })
    .then((response) => {
      console.log(response.data);
      res.json({ res: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.json({ msg: 'Error in calling API' });
    });
};

module.exports.recipeDetail = function recipeDetailExport(req, res) {
  instance.get(`/recipes/${req.body.ingredientID}/information`)
    .then((response) => {
      console.log(response.data);
      res.json({ res: response.data });
    })
    .catch((error) => {
      console.log(error);
      res.json({ msg: 'Error in calling API' });
    });
};

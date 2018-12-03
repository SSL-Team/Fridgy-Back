module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ingredientNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ingredientName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Ingredient;
};

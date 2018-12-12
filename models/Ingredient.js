module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('ingredient', {
    userID: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    Type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ImgURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Ingredient;
};

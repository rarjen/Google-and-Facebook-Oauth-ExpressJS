"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_bio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_bio.init(
    {
      avatar: DataTypes.STRING,
      file_name: DataTypes.STRING,
      email: DataTypes.STRING,
      bio: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_bio",
    }
  );
  return User_bio;
};

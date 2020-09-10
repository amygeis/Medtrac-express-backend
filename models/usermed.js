'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserMed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  UserMed.init({
    userId: DataTypes.INTEGER,
    medId: DataTypes.INTEGER,
    timeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserMed',
  });
  return UserMed;
};
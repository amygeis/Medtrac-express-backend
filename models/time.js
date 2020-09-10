'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Time.belongsToMany(models.User, {
        through: 'UserMed',
        foreignKey: 'timeId',
        otherKey: 'userId',
      })
      Time.belongsToMany(models.Medicine,{
        through: 'UserMed',
        foreignKey: 'timeId',
        otherKey: 'medId',
      })
    }
  };
  Time.init({
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Time',
  });
  return Time;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Medicine.belongsToMany(models.User, {
        through: 'UserMed',
        foreignKey: 'medId',
        otherKey: 'userId'
      }),
      Medicine.belongsToMany(models.Time, {
        through: 'UserMed',
        foreignKey: 'medId',
        otherKey: 'timeId',
      }),
      Medicine.hasOne(models.medpic, {
        foreignKey: "rxcui"
      })
    }
  };
  Medicine.init({
    name: DataTypes.STRING,
    rxcui: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};
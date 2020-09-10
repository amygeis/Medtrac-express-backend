'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedPic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MedPic.belongsTo(models.Medicine, {
        foreignKey:"rxcui"
      });
    }
  };
  MedPic.init({
    rxcui: DataTypes.INTEGER,
    imgname: DataTypes.STRING,
    img: DataTypes.BLOB
  }, {
    sequelize,
    modelName: 'MedPic',
  });
  return MedPic;
};
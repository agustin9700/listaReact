'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rank.init({
    nombre: DataTypes.STRING,
    previarep: DataTypes.INTEGER,
    reputacion: DataTypes.INTEGER,
    diferencia: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'Rank',
    timestamps: false
  });
  return Rank;
};
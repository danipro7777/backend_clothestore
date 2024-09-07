'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class temporadas extends Model {
    static associate(models) {
   
    }
  }

  temporadas.init({
    idTemporada: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    temporada: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'temporadas',
    tableName: 'temporadas',
    timestamps: false
  });

  return temporadas;
};
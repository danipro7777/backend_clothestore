'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ocasiones extends Model {
  };

  ocasiones.init({
    idOcasion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ocasion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'ocasiones', // nombre del modelo
    tableName: 'ocasiones', // Nombre de la tabla
    timestamps: false // No incluir createdAt y updatedAt
  });

  return ocasiones;
};
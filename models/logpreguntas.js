'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class logpreguntas extends Model {
    static associate(models) {
   
    }
  }

  logpreguntas.init({
    idPregunta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    pregunta: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    respuesta: {
        type: DataTypes.TEXT,
        allowNull: true
      },
    frecuencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'logpreguntas',
    tableName: 'logpreguntas',
    timestamps: false
  });

  return logpreguntas;
};
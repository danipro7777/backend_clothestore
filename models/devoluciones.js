'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class devoluciones extends Model {
    static associate(models) {
      
    }
  }

  devoluciones.init({
    idDevolucion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fechaDevolucion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING(250),
        allowNull: false
      },
    idVenta: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'devoluciones',
    tableName: 'devoluciones',
    timestamps: false
  });

  return devoluciones;
};
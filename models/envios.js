'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class envios extends Model {
    static associate(models) {
      // Relación con ventas
      envios.belongsTo(models.ventas, {
        foreignKey: 'idVenta'
      });
    }
  }

  envios.init({
    idEnvio: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fechaEnvio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    fechaRecepcion: {
      type: DataTypes.DATE,
      allowNull: false
    },
    idVenta: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'envios',
    tableName: 'envios',
    timestamps: false
  });

  return envios;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class pagos extends Model {
  };

  pagos.init({
    idPago: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    transferencia: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    banco: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correlativo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tarjetaCredito: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    numeroCredito: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tarjetaDebito: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    numeroDebito: {
        type: DataTypes.STRING,
        allowNull: false
    },
    efectivo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    paypal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
  }, {
    sequelize,
    modelName: 'pagos',
    timestamps: false // No incluir createdAt y updatedAt
  });

  return pagos;
};
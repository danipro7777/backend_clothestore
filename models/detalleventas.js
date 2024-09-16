'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class detalleventas extends Model {
    static associate(models) {
      // Relación con temporadas
      detalleventas.belongsTo(models.ventas, {
        foreignKey: 'idVenta'
      });
      // Relación con productos
      detalleventas.belongsTo(models.inventarios, {
        foreignKey: 'idInventario'
      });
    }
  }

  detalleventas.init({
    idDetalleVentas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    idVenta: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idInventario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
  }, {
    sequelize,
    modelName: 'detalleventas',
    tableName: 'detalleventas',
    timestamps: false
  });

  return detalleventas;
};

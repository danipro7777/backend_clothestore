'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ventas extends Model {
    static associate(models) {
      // Relación con clientes
      ventas.belongsTo(models.clientes, {
        foreignKey: 'idCliente'
      });
      // Relación con pagos
      ventas.belongsTo(models.pagos, {
        foreignKey: 'idPago'
      });
      // Relación con descuentos
      ventas.belongsTo(models.Descuento, {
        foreignKey: 'idDescuento'
      });
      // Relación con cupones
      ventas.belongsTo(models.Cupon, {
        foreignKey: 'idCupon'
      });

      ventas.hasMany(models.detalleventas, {
        foreignKey: 'idVenta'
      });
      ventas.hasMany(models.envios, {
        foreignKey: 'idVenta'
      });
      ventas.hasMany(models.envios, {
        foreignKey: 'idVenta'
      });
    }
  }

  ventas.init({
    idVenta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fechaVenta: {
      type: DataTypes.DATE,
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    idCliente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idPago: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idDescuento: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idCupon: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ventas',
    tableName: 'ventas',
    timestamps: false
  });

  return ventas;
};
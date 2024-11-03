'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class detalletallas extends Model {
    static associate(models) {
      // Relación con la tabla de Tallas
      detalletallas.belongsTo(models.tallas, {
        foreignKey: 'idTalla'
      });
      // Relación con la tabla de Productos
      detalletallas.belongsTo(models.productos, {
        foreignKey: 'idProducto'
      });
    }
  }

  detalletallas.init({
    idDetalleTalla: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    idTalla: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detalletallas',
    tableName: 'detalletallas',
    timestamps: false
  });

  return detalletallas;
};

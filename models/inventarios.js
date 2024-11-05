'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class inventarios extends Model {
    static associate(models) {
      // Relación muchos a uno con productos
      inventarios.belongsTo(models.productos, {
        foreignKey: 'idProducto' // Sin alias
      });      
    }
  }

  inventarios.init({
    idInventario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fechaIngreso: {
      type: DataTypes.DATE,
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'inventarios',
    tableName: 'inventarios',
    timestamps: false
  });

  return inventarios;
};

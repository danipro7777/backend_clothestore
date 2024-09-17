'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class detalleOcasiones extends Model {
    static associate(models) {
      // Relación con ocasiones
      detalleOcasiones.belongsTo(models.ocasiones, {
        foreignKey: 'idOcasion'
      });
      // Relación con productos
      detalleOcasiones.belongsTo(models.productos, {
        foreignKey: 'idProducto'
      });
    }
  }

  detalleOcasiones.init({
    idDetalleOcasion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idOcasion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estado: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    modelName: 'detalleOcasiones',
    tableName: 'detalleOcasiones',
    timestamps: false
  });

  return detalleOcasiones;
};

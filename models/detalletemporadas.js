'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class detalletemporadas extends Model {
    static associate(models) {
      // Relación con temporadas
      detalletemporadas.belongsTo(models.temporadas, {
        foreignKey: 'idTemporada'
      });
      // Relación con productos
      detalletemporadas.belongsTo(models.productos, {
        foreignKey: 'idProducto'
      });
    }
  }

  detalletemporadas.init({
    idDetalleTemporada: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    idTemporada: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'detalletemporadas',
    tableName: 'detalletemporadas',
    timestamps: false
  });

  return detalletemporadas;
};

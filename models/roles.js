'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    static associate(models) {
      // Asociación con el modelo roles
      roles.hasMany(models.empleados, {
        foreignKey: 'idRol'
      });
    }
  };

  roles.init({
    idRol: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rol: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estado: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'roles',
    timestamps: false // No incluir createdAt y updatedAt
  });

  return roles;
};
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Descuento extends Model {
        static associate(models) {
            // Definir asociaciones si es necesario
        }
    }

    Descuento.init({
        idDescuento: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        descuento: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING(225),
            allowNull: false,
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        sequelize,
        modelName: 'Descuento',
        tableName: 'descuentos',
        timestamps: false,
    });

    return Descuento;
};

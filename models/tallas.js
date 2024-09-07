'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class tallas extends Model {
        static associate(models) {
            // Aquí puedes definir asociaciones si es necesario
        }
    }

    tallas.init({
        idTalla: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        talla: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        sequelize,
        modelName: 'tallas',
        tableName: 'tallas',
        timestamps: false,
    });

    return tallas;
};

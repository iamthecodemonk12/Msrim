'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class sermons_table extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    sermons_table.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        sermons_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sermon_pastor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        theme: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sermon_body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sermon_audio: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sermon_pdf: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sermon_s_link: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pic: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        sequelize,
        modelName: 'sermons_table',
    });
    return sermons_table;
};
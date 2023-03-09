'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mail_sub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mail_sub.init({
      id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
     uuid: {
        // allowNull: false,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
      },
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mail_sub',
  });
  return mail_sub;
};
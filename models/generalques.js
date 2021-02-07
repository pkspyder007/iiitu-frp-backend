'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GeneralQues extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      GeneralQues.belongsTo(models.Application, { foreignKey: "appId", as: "application"})
    }
  };
  GeneralQues.init({
    one: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    two: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    three: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    four: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    five: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    appId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // User belongsTo Company 1:1
        model: "Applications",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'GeneralQues',
  });
  return GeneralQues;
};
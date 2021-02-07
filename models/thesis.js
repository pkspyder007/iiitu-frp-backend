'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thesis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Thesis.belongsTo(models.Application, { foreignKey: 'appId', as: "application"})
    }
  };
  Thesis.init({
    phdCompleted: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phdProgress: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pgCompleted: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pgProgress: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ugCompleted: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ugProgress: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    doc: {
      type: DataTypes.STRING,
      allowNull: false
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
    modelName: 'Thesis',
  });
  return Thesis;
};
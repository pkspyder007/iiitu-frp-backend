'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Research extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Research.belongsTo(models.Application, { foreignKey: 'appId', as: "application"})
    }
  };
  Research.init({
    projectAsPI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grantPI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    projectAsCOPI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grantCOPI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inProgressAsPI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grantInProgressAsPI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    inProgressAsCOPI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    grantInProgressAsCOPI: {
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
    modelName: 'Research',
  });
  return Research;
};
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
      Research.belongsTo(models.Application, { foreignKey: 'appId'})
    }
  };
  Research.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sponsor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end: {
      type: DataTypes.STRING,
      allowNull: false
    },
    outcome: {
      type: DataTypes.TEXT,
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
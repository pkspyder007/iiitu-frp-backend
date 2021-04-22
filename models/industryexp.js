'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IndustryExp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      IndustryExp.belongsTo(models.Application, { foreignKey: "appId"})
    }
  };
  IndustryExp.init({
    org: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false
    },
    from: {
      type: DataTypes.STRING,
      allowNull: false
    },
    to: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    natureOfDuties: {
      type: DataTypes.STRING,
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
    modelName: 'IndustryExp',
  });
  return IndustryExp;
};
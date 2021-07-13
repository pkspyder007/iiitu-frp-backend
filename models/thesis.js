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
      Thesis.belongsTo(models.Application, { foreignKey: 'appId'})
    }
  };
  Thesis.init({
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nameOfCandidate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    insitute: {
      type: DataTypes.STRING,
      allowNull: false
    },
    regYear: {
      type: DataTypes.STRING,
      allowNull: true
    },
    finalViva: {
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
    modelName: 'Thesis',
  });
  return Thesis;
};
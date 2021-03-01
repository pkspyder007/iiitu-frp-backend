'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BestPapers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BestPapers.belongsTo(models.Application, { foreignKey: "appId"})
    }
  };
  BestPapers.init({
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    yearOfPub: {
      type: DataTypes.STRING,
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true
    },
    doc: {
      type: DataTypes.STRING,
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
    }
  }, {
    sequelize,
    modelName: 'BestPapers',
  });
  return BestPapers;
};
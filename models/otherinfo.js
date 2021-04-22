"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OtherInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OtherInfo.belongsTo(models.Application, { foreignKey: "appId" });
    }
  }
  OtherInfo.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      by: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "NA",
      },
      date: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      doc: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    },
    {
      sequelize,
      modelName: "OtherInfo",
    }
  );
  return OtherInfo;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PersonalDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PersonalDetail.belongsTo(models.Application, { foreignKey: "appId" });
    }
  }
  PersonalDetail.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      corAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fax: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      perAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      secPhone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secFax: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secEmail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      DOB: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dobDoc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sex: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      martialStatus: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catDoc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pwd: {
        type: DataTypes.STRING,
        defaultValue: "NO",
      },
      pwdDoc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      govtIdCard: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "PersonalDetail",
    }
  );
  return PersonalDetail;
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OtherInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OtherInfo.belongsTo(models.Application, { foreignKey: "appId"})
    }
  };
  OtherInfo.init({
    awards: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    extraCirricular: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    membership: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    special: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    others: {
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
  }, {
    sequelize,
    modelName: 'OtherInfo',
  });
  return OtherInfo;
};
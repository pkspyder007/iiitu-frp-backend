'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Patents.belongsTo(models.Application, { foreignKey: "appId"})
    }
  };
  Patents.init({
    noOfPatents: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    list: {
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
    modelName: 'Patents',
  });
  return Patents;
};
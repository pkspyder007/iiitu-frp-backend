'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Publications.belongsTo(models.Application, { foreignKey: "appId"})

    }
  };
  Publications.init({
    books: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nJournals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    iJournals: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nConf: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    iConf: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    doc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    appId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Applications",
        key: "id",
        allowNull: false
      },
    },
  }, {
    sequelize,
    modelName: 'Publications',
  });
  return Publications;
};
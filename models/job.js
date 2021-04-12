'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Job.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dept: {
      type: DataTypes.STRING,
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    adNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    school: {
      type: DataTypes.STRING,
      allowNull: true
    },
    docLink: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isExpired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
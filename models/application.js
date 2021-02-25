'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.hasMany(models.AcadExperience, { foreignKey: "appId"});
      Application.hasMany(models.AcadQualification, { foreignKey: "appId" });
      Application.hasOne(models.BestPapers, { foreignKey: "appId"});
      Application.hasOne(models.FuturePlans, { foreignKey: "appId"});
      Application.hasOne(models.GeneralQues, { foreignKey: "appId"});
      Application.hasMany(models.IndustryExp, { foreignKey: "appId"});
      Application.hasOne(models.OtherInfo, { foreignKey: "appId"});
      Application.hasOne(models.Patents, { foreignKey: "appId"});
      Application.hasOne(models.PersonalDetail, { foreignKey: "appId"});
      Application.hasOne(models.Publications, { foreignKey: "appId"});
      Application.hasMany(models.Referee, { foreignKey: "appId"});
      Application.hasOne(models.Research, { foreignKey: "appId"});
      Application.hasOne(models.SOP, { foreignKey: "appId"});
      Application.hasOne(models.Thesis, { foreignKey: "appId"});
    }
  };
  Application.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    adNo: DataTypes.STRING,
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dept: {
      type: DataTypes.STRING,
      allowNull: false
    },
    school: {
      type: DataTypes.STRING,
      allowNull: false
    },
    toc: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    currentStep: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    eduMode: {
      type: DataTypes.STRING
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    completedSteps: {
      type: DataTypes.STRING,
      defaultValue: JSON.stringify([]),
      get: function() {
        return JSON.parse(this.getDataValue('completedSteps'));
      },
      set: function(val) {
        return this.setDataValue('completedSteps', JSON.stringify(val));
      }
    },

  }, {
    sequelize,
    modelName: 'Application',
  });
  return Application;
};
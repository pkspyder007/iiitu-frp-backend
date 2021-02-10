const Validator = require("fastest-validator");
const db = require("../models/index");
const { createSchema, personalInfoCheck } = require("../utils/applicationValidationSchemas");
const v = new Validator();


const createCheck = v.compile(createSchema);
const personalCheck = v.compile(personalInfoCheck);

exports.createApp = async (req, res) => {
  try {
    const errors = createCheck({...req.body, userId: req.user.userId});
    if (errors.length) {
      return res.status(400).json({ errors });
    };

    const checkAppExists = await db.Application.findOne( {where: { userId: req.user.userId, jobId: req.body.jobId }});
    if (checkAppExists) {
      return res.status(400).json({ msg: "Application already exists.", errors: [ {message: "You have already applied to this opening please check your dashboard."}] });
    };

    const app = await db.Application.create({...req.body, userId: req.user.userId});
    res.status(201).json({
      msg: "Job created successfully.",
      application: app,
    });
  } catch (error) {
    let errors = [ error.message ]
    res.status(500).json({
      errors,
    });
  }
};

exports.addPersonalInfo = async (req, res) => {
  
  if(req.body.pwd === "true") {
    req.body.pwdDoc = req.files.pwdDoc[0]?.path
  }
  req.body.govtIdCard = req.files?.govtIdCard[0]?.path
  req.body.photo = req.files?.photo[0]?.path
  req.body.appId = req.params.id
  
  try {
    const errors = personalCheck(req.body);
    if (errors.length) {
      return res.status(400).json({ msg: "Validation Errors", errors });
    };
    
    console.log("Data: 1 ");
    const existsCheck = await db.PersonalDetail.findOne({where: { appId: req.body.appId }});
    if (existsCheck) {
      return res.status(400).json({ msg: "Data already exists.", errors: [ {message: "You have already filled the details for this section."}] });
    };

    const data = await db.PersonalDetail.create({...req.body, userId: req.user.userId });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [ {message: error.message} ];
    res.status(500).json({
      errors,
    });
  }
}
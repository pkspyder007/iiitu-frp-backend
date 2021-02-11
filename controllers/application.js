const Validator = require("fastest-validator");
const db = require("../models/index");
const {
  createSchema,
  personalInfoCheck,
} = require("../utils/applicationValidationSchemas");
const v = new Validator();

const createCheck = v.compile(createSchema);
const personalCheck = v.compile(personalInfoCheck);

exports.createApp = async (req, res) => {
  try {
    const errors = createCheck({ ...req.body, userId: req.user.userId });
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const checkAppExists = await db.Application.findOne({
      where: { userId: req.user.userId, jobId: req.body.jobId },
    });
    if (checkAppExists) {
      return res
        .status(400)
        .json({
          msg: "Application already exists.",
          errors: [
            {
              message:
                "You have already applied to this opening please check your dashboard.",
            },
          ],
        });
    }

    const app = await db.Application.create({
      ...req.body,
      appId: req.params.id,
      userId: req.user.userId,
    });
    res.status(201).json({
      msg: "Job created successfully.",
      application: app,
    });
  } catch (error) {
    console.log(error);
    let errors = [error.message];
    res.status(500).json({
      errors,
    });
  }
};

exports.addPersonalInfo = async (req, res) => {
  if (req.body.pwd === "true") {
    req.body.pwdDoc = req.files.pwdDoc[0]?.path;
  }
  req.body.govtIdCard = req.files?.govtIdCard[0]?.path;
  req.body.photo = req.files?.photo[0]?.path;
  req.body.appId = req.params.id;

  try {
    const errors = personalCheck(req.body);
    if (errors.length) {
      return res.status(400).json({ msg: "Validation Errors", errors });
    }

    console.log("Data: 1 ");
    const existsCheck = await db.PersonalDetail.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.PersonalDetail.create({
      ...req.body,
      appId: parseInt(req.params.id, 10),
      userId: req.user.userId,
    });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    console.log(error);
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addEducation = async (req, res) => {
  req.body.doc = req.files?.doc[0]?.path;
  req.body.appId = req.params.id;

  try {
    // const errors = personalCheck(req.body);
    // if (errors.length) {
    //   return res.status(400).json({ msg: "Validation Errors", errors });
    // };

    if (!req.body.education) {
      return res
        .status(400)
        .json({ msg: "Please select an School/College.", errors: [] });
    }

    const existsCheck = await db.AcadQualification.findOne({
      where: { appId: req.params.id, education: req.body.education },
    });
    if (existsCheck) {
      if (req.body.education !== "OTHER") {
        return res
          .status(400)
          .json({
            msg: "Data already exists.",
            errors: [
              {
                message:
                  "You have already filled the details for this education.",
              },
            ],
          });
      }
    }

    const data = await db.AcadQualification.create({
      ...req.body,
      userId: req.user.userId,
    });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addAcadExp = async (req, res) => {
  req.body.doc = req.files?.doc[0]?.path;
  req.body.appId = req.params.id;

  try {
    if (!req.body.org) {
      return res
        .status(400)
        .json({ msg: "Please provide an Universiry/Org.", errors: [] });
    }

    const existsCheck = await db.AcadExperience.findOne({
      where: {
        appId: req.body.appId,
        org: req.body.org,
        designation: req.body.designation,
      },
    });
    if (existsCheck) {
      if (req.body.education !== "OTHER") {
        return res
          .status(400)
          .json({
            msg: "Data already exists.",
            errors: [
              {
                message:
                  "You have already filled the details for this education.",
              },
            ],
          });
      }
    }

    const data = await db.AcadExperience.create({
      ...req.body,
      userId: req.user.userId,
    });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addSponseredProject = async (req, res) => {
  req.body.doc = req.files?.doc[0]?.path;
  req.body.appId = req.params.id;

  try {
    const existsCheck = await db.Research.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.Research.create({ ...req.body });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addThesis = async (req, res) => {
  req.body.doc = req.files?.doc[0]?.path;
  req.body.appId = req.params.id;

  try {
    const existsCheck = await db.Thesis.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.Thesis.create({ ...req.body });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addIndExp = async (req, res) => {
  req.body.doc = req.files?.doc[0]?.path;
  req.body.appId = req.params.id;

  try {
    // const existsCheck = await db.IndustryExp.findOne({where: { appId: req.body.appId}});
    // if (existsCheck) {
    //     return res.status(400).json({ msg: "Data already exists.", errors: [ {message: "You have already filled the details for this section."}] });
    // };

    const data = await db.IndustryExp.create({ ...req.body });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addPublications = async (req, res) => {
  req.body.doc = req.files?.doc[0]?.path;
  req.body.appId = req.params.id;

  try {
    const existsCheck = await db.Publications.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.Publications.create({ ...req.body });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addBestPapers = async (req, res) => {
  try {
    req.body.first = req.files?.first[0]?.path;
    req.body.second = req.files?.second[0]?.path;
    req.body.third = req.files?.third[0]?.path;
    req.body.appId = req.params.id;

    const existsCheck = await db.BestPapers.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.BestPapers.create({ ...req.body });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addSOP = async (req, res) => {
  try {
    req.body.doc = req.files?.doc[0]?.path;
    const existsCheck = await db.SOP.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.SOP.create({ ...req.body, appId: req.params.id });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addPatents = async (req, res) => {
  try {
    const existsCheck = await db.Patents.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.Patents.create({ ...req.body, appId: req.params.id });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addOtherInfo = async (req, res) => {
  try {
    if (req.body.awards !== "") req.body.awards = req.files?.awards[0]?.path;
    if (req.body.extraCirricular !== "")
      req.body.extraCirricular = req.files?.extraCirricular[0]?.path;

    const existsCheck = await db.OtherInfo.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.OtherInfo.create({
      ...req.body,
      appId: req.params.id,
    });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addFuturePlans = async (req, res) => {
  try {
    req.body.doc = req.files?.doc[0]?.path;
    const existsCheck = await db.FuturePlans.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.FuturePlans.create({
      ...req.body,
      appId: req.params.id,
    });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addGeneral = async (req, res) => {
  try {
    const existsCheck = await db.GeneralQues.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this section.",
            },
          ],
        });
    }

    const data = await db.GeneralQues.create({
      ...req.body,
      appId: req.params.id,
    });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.addReferees = async (req, res) => {
  console.log(req.body);
  try {
    const existsCheck = await db.Referee.findOne({
      where: { email: req.body.email },
    });
    if (existsCheck) {
      return res
        .status(400)
        .json({
          msg: "Data already exists.",
          errors: [
            {
              message: "You have already filled the details for this Referee.",
            },
          ],
        });
    }

    const data = await db.Referee.create({ ...req.body, appId: req.params.id });
    res.status(201).json({
      msg: "Data added successfully.",
      data: data,
    });
  } catch (error) {
    let errors = [{ message: error.message }];
    res.status(500).json({
      errors,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const app = await db.Application.findOne({
      where: { id: req.params.id, userId: req.user.userId },
      include: [
        { model: db.AcadExperience },
        { model: db.AcadQualification },
        { model: db.BestPapers },
        { model: db.FuturePlans },
        { model: db.GeneralQues },
        { model: db.IndustryExp },
        { model: db.OtherInfo },
        { model: db.Patents },
        { model: db.PersonalDetail },
        { model: db.Publications },
        { model: db.Referee },
        { model: db.Research },
        { model: db.SOP },
        { model: db.Thesis },
      ],
    });
    if (!app) {
      return res.status(400).json({ msg: "Application not found" });
    }
    return res.json({ msg: "Application found", app });
  } catch (error) {
    return res.json({ msg: error.message });
  }
};

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
      where: {
        userId: req.user.userId,
        jobId: req.body.jobId,
        school: req.body.school,
        dept: req.body.dept,
      },
    });
    if (checkAppExists) {
      return res.status(400).json({
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
  req.body.dobDoc = req.files?.dobDoc[0]?.path;
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
      return res.status(400).json({
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
        return res.status(400).json({
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
        return res.status(400).json({
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
    // const existsCheck = await db.Research.findOne({
    //   where: { appId: req.params.id },
    // });
    // if (existsCheck) {
    //   return res.status(400).json({
    //     msg: "Data already exists.",
    //     errors: [
    //       {
    //         message: "You have already filled the details for this section.",
    //       },
    //     ],
    //   });
    // }

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
    // const existsCheck = await db.Thesis.findOne({
    //   where: { appId: req.params.id },
    // });
    // if (existsCheck) {
    //   return res.status(400).json({
    //     msg: "Data already exists.",
    //     errors: [
    //       {
    //         message: "You have already filled the details for this section.",
    //       },
    //     ],
    //   });
    // }

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
      return res.status(400).json({
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
    req.body.doc = req.files?.doc[0]?.path;
    // req.body.second = req.files?.second[0]?.path;
    // req.body.third = req.files?.third[0]?.path;
    req.body.appId = req.params.id;

    const existsCheck = await db.BestPapers.findOne({
      where: { appId: req.params.id },
    });
    // if (existsCheck) {
    //   return res.status(400).json({
    //     msg: "Data already exists.",
    //     errors: [
    //       {
    //         message: "You have already filled the details for this section.",
    //       },
    //     ],
    //   });
    // }

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
      return res.status(400).json({
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
    // if (existsCheck) {
    //   return res.status(400).json({
    //     msg: "Data already exists.",
    //     errors: [
    //       {
    //         message: "You have already filled the details for this section.",
    //       },
    //     ],
    //   });
    // }

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
    // console.log(req.files);
    if (req.body.doc !== "") req.body.doc = req.files?.doc[0]?.path;
    // const existsCheck = await db.OtherInfo.findOne({
    //   where: { appId: req.params.id },
    // });
    // if (existsCheck) {
    //   return res.status(400).json({
    //     msg: "Data already exists.",
    //     errors: [
    //       {
    //         message: "You have already filled the details for this section.",
    //       },
    //     ],
    //   });
    // }

    const data = await db.OtherInfo.create({
      ...req.body,
      appId: req.params.id,
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

exports.addFuturePlans = async (req, res) => {
  try {
    console.log(req.params);
    req.body.doc = req.files?.doc[0]?.path;
    const existsCheck = await db.FuturePlans.findOne({
      where: { appId: req.params.id },
    });
    if (existsCheck) {
      const data = await db.FuturePlans.update(
        {
          ...req.body,
          appId: req.params.id,
        },
        { where: { appId: req.params.id } }
      );
      return res.status(201).json({
        msg: "Data added successfully.",
        data: data,
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
      return res.status(400).json({
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
      return res.status(400).json({
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

exports.setEduMode = async (req, res) => {
  try {
    const data = await db.Application.update(
      { eduMode: req.body.mode },
      { where: { id: req.params.id } }
    );
    if (!data) {
      return res.status(500).json({
        errors: [{ message: "Something went wrong." }],
      });
    }
    return res.json({ message: "Edu mode updated successfully." });
  } catch (error) {
    let errors = [{ message: error.message }];
    return res.status(500).json({
      errors,
    });
  }
};

exports.lockApp = async (req, res) => {
  try {
    const errors = [];
    const app = await db.Application.findOne({
      where: { id: req.params.id, userId: req.user.userId },
      include: [{ model: db.PersonalDetail }, { model: db.AcadQualification }],
    });
    if (!app.PersonalDetail) {
      errors.push("Personal Information not provided.");
    }
    const educations = app.AcadQualifications.map((e) => e.education);

    console.log(app.eduMode);

    switch (app.eduMode) {
      case "normal":
        if (!educations.includes("UG")) {
          errors.push("UG academic details are not present");
        }
        if (!educations.includes("PG")) {
          errors.push("PG academic details are not present");
        }
        if (!educations.includes("PHD")) {
          errors.push("PHD academic details are not present");
        }
        break;

      case "dual":
        if (!educations.includes("PG")) {
          errors.push("PG academic details are not present");
        }
        if (!educations.includes("PHD")) {
          errors.push("PHD academic details are not present");
        }
        break;

      case "dphd":
        if (!educations.includes("PHD")) {
          errors.push("PHD academic details are not present");
        }
        break;

      default:
        if (educations.length < 1) {
          errors.push("No Education details found.");
        }
        errors.push("No Education mode selected");
        break;
    }

    if (errors.length) {
      return res.status(400).json({
        errors,
      });
    }
    const totals = await db.Application.findAll({ where: { dept: app.dept } });
    let d = new Date();
    let n = d.getFullYear();
    let refNum = `AP${n}-${app.dept.toUpperCase()}-${totals.length}`;
    // console.log("---------------------------------");
    // console.log(refNum);
    // console.log("---------------------------------");
    await app.update({ refNum, completed: true, toc: true });
    res.json({ msg: "Application locked. Please complete the Fee payment" });
  } catch (error) {
    console.log(error);
    let errors = [error.message];
    res.status(500).json({
      errors,
    });
  }
};

exports.addFeeDetails = async (req, res) => {
  try {
    req.body.feeReciept = req.files?.feeReciept[0]?.path;
    const data = await db.Application.update(
      {
        feeTid: req.body.feeTid,
        feeReciept: req.body.feeReciept,
        feeDate: req.body.feeDate,
      },
      { where: { id: req.params.id } }
    );
    if (!data) {
      return res.status(500).json({
        errors: [{ message: "Something went wrong." }],
      });
    }
    return res.json({ message: "Fee Deatils updated successfully." });
  } catch (error) {
    let errors = [{ message: error.message }];
    return res.status(500).json({
      errors,
    });
  }
};

exports.GenPdf = async (req, res) => {
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
    if (!app) return res.status(400).json({ msg: "Application not found" });
    console.log(app.PersonalDetail.dataValues);
    return res.render("index", { msg: req.params.id });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
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
    return res.status(400).json({ msg: error.message });
  }
};

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generatePDF = async (req, res) => {
  try {
    const doc = new PDFDocument();
    doc.pipe(
      fs.createWriteStream(path.join(process.cwd(), "uploads", "test.pdf"))
    );
    doc.text("doc details");

    doc.end();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deletePersonal = async (req, res) => {
  try {
    const data = await db.PersonalDetail.findOne({
      where: { id: req.params.id },
    });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteAcadExp = async (req, res) => {
  try {
    const data = await db.AcadExperience.findOne({
      where: { id: req.params.id },
    });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteAcadQual = async (req, res) => {
  try {
    const data = await db.AcadQualification.findOne({
      where: { id: req.params.id },
    });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteBestPapers = async (req, res) => {
  try {
    const data = await db.BestPapers.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteFuturePlans = async (req, res) => {
  try {
    const data = await db.FuturePlans.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteGeneralQues = async (req, res) => {
  try {
    const data = await db.GeneralQues.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteIndExp = async (req, res) => {
  try {
    const data = await db.IndustryExp.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteOtherInfo = async (req, res) => {
  try {
    const data = await db.OtherInfo.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deletePatents = async (req, res) => {
  try {
    const data = await db.Patents.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deletePublications = async (req, res) => {
  try {
    const data = await db.Publications.findOne({
      where: { id: req.params.id },
    });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteReferees = async (req, res) => {
  try {
    const data = await db.Referee.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteResearch = async (req, res) => {
  try {
    const data = await db.Research.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteSOP = async (req, res) => {
  try {
    const data = await db.SOP.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.deleteThesis = async (req, res) => {
  try {
    const data = await db.Thesis.findOne({ where: { id: req.params.id } });
    await data.destroy();
    res.json({ msg: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

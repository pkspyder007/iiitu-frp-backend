const Validator = require("fastest-validator");
const db = require("../models/index");
const v = new Validator();

const jobSchema = {
  title: { type: "string", nullable: false },
  dept: { type: "string", nullable: false },
  desc: { type: "string", nullable: false },
  adNo: { type: "string", nullable: false },
  school: { type: "string", nullable: false },
  docLink: { type: "string", nullable: false },
};

const jobCheck = v.compile(jobSchema);

exports.createJob = async (req, res) => {
  try {
    const errors = jobCheck(req.body);
    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const job = await db.Job.create(req.body);
    res.status(201).json({
      msg: "Job created successfully.",
      job,
    });
  } catch (error) {
    let errors = error.errors.map((e) => ({message: e.message}));
    res.status(500).json({
      errors,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const jobs = await db.Job.findAll({
      order: [
        ['createdAt', "DESC"]
      ]
    });
    res.status(201).json({
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const job = await db.Job.findByPk(req.params.id);
    res.status(201).json({
      job,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

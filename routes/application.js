var express = require("express");
const { checkAuth } = require("../utils/auth");
const {
  createApp,
  addPersonalInfo,
  addEducation,
  addAcadExp,
  addSponseredProject,
  addThesis,
  addIndExp,
  addPublications,
  addBestPapers,
  addSOP,
  addPatents,
  addOtherInfo,
  addFuturePlans,
  addGeneral,
  addReferees,
  lockApp,
  getById,
  deletePersonal,
  deleteAcadExp,
  deleteAcadQual,
  deleteBestPapers,
  deleteFuturePlans,
  deleteGeneralQues,
  deleteIndExp,
  deleteOtherInfo,
  deletePatents,
  deletePublications,
  deleteReferees,
  deleteResearch,
  deleteSOP,
  deleteThesis,
  setEduMode,
  addFeeDetails,
  GenPdf
} = require("../controllers/application");
const { uploadMiddleware } = require("../utils/upload");
var router = express.Router();
const multer = require("multer");

router.post("/create", checkAuth, createApp);
router.post(
  "/:id/personalInfo",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([
        { name: "pwdDoc" },
        { name: "catDoc" },
        { name: "govtIdCard" },
        { name: "photo" },
      ])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addPersonalInfo
);

router.post("/:id/setEdumode", checkAuth, setEduMode);

router.post(
  "/:id/education",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addEducation
);

router.post(
  "/:id/acadexp",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addAcadExp
);

router.post(
  "/:id/sp",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addSponseredProject
);

router.post(
  "/:id/thesis",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addThesis
);

router.post(
  "/:id/indExp",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addIndExp
);

router.post(
  "/:id/publications",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addPublications
);

router.post(
  "/:id/bestpapers",
  checkAuth,
  function (req, res, next) {
    console.log(req.body);
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addBestPapers
);

router.post(
  "/:id/sop",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addSOP
);

router.post("/:id/patents", checkAuth, addPatents);

router.post(
  "/:id/otherinfo",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addOtherInfo
);

router.post(
  "/:id/futureplans",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "doc" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addFuturePlans
);

router.post(
  "/:id/feeDetails",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "feeReciept" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
        errors: [
          "Something went wrong while uploading documents. Please try again...",
        ],
      });
    }
  },
  addFeeDetails
);

router.post("/:id/general", checkAuth, addGeneral);

router.post("/:id/referees", checkAuth, addReferees);

router.post("/:id/lock", checkAuth, lockApp);

router.get("/:id", checkAuth, getById);
router.get('/:id/gpdf',checkAuth, GenPdf)

router.delete("/personal/:id", checkAuth, deletePersonal);
router.delete("/acadexp/:id", checkAuth, deleteAcadExp);
router.delete("/acadqual/:id", checkAuth, deleteAcadQual);
router.delete("/bestpapers/:id", checkAuth, deleteBestPapers);
router.delete("/futureplans/:id", checkAuth, deleteFuturePlans);
router.delete("/generalques/:id", checkAuth, deleteGeneralQues);
router.delete("/indexp/:id", checkAuth, deleteIndExp);
router.delete("/otherinfo/:id", checkAuth, deleteOtherInfo);
router.delete("/patents/:id", checkAuth, deletePatents);
router.delete("/publications/:id", checkAuth, deletePublications);
router.delete("/referees/:id", checkAuth, deleteReferees);
router.delete("/research/:id", checkAuth, deleteResearch);
router.delete("/sop/:id", checkAuth, deleteSOP);
router.delete("/thesis/:id", checkAuth, deleteThesis);

module.exports = router;

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
  addReferees
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
        { name: "govtIdCard" },
        { name: "photo" },
      ])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res
        .status(500)
        .json({
          msg: "Server Error",
          errors: [
            "Something went wrong while uploading documents. Please try again...",
          ],
        });
    }
  },
  addPersonalInfo
);

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
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
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
    try {
      uploadMiddleware([{ name: "first" }, { name: "second" }, { name: "third"}])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
          msg: "Server Error",
          errors: [
            "Something went wrong while uploading documents. Please try again...",
          ],
        });
    }
  },
  addSOP
);

router.post(
  "/:id/patents",
  checkAuth,
  addPatents
);

router.post(
  "/:id/otherinfo",
  checkAuth,
  function (req, res, next) {
    try {
      uploadMiddleware([{ name: "awards" },{ name: "extraCirricular" }])(req, res, (err) => {
        if (err) {
          return res.status(400).json({ msg: err.message, errors: [] });
        }
        next();
      });
    } catch (error) {
      res
        .status(500)
        .json({
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
      res
        .status(500)
        .json({
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
  "/:id/general",
  checkAuth,
  addGeneral
);

router.post(
  "/:id/referees",
  checkAuth,
  addReferees
);

module.exports = router;

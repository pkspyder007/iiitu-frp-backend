var express = require("express");
const { checkAuth } = require("../utils/auth");
const { createApp, addPersonalInfo } = require("../controllers/application");
const { uploadMiddleware } = require("../utils/upload");
var router = express.Router();
const multer = require("multer");

router.post("/create", checkAuth, createApp);
router.post(
  "/:id/personalInfo",
  checkAuth,
  function(req,res, next) {
   try {
    uploadMiddleware([{ name: "pwdDoc" }, { name: "govtIdCard" }, { name: "photo" }])(req, res , (err) => {
      if(err) {
        return res.status(400).json({message: err.message, errors: []});
      }
      next();
    });
   } catch (error) {
     res.status(500).json({msg: "Server Error", errors: ["Something went wrong while uploading documents. Please try again..."]})
   }
  },  
  addPersonalInfo
);
module.exports = router;

const Validator = require("fastest-validator");
const bcrypt = require("bcryptjs");
const db = require("../models");
const jwt = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const { sendEmail } = require("../utils/email");
const verifyEmailTemplate = require("../utils/verifyEmailTemplate");
const salt = bcrypt.genSaltSync(10);

const v = new Validator();

const registerSchema = {
  name: { type: "string", nullable: false },
  email: { type: "email", nullable: false },
  password: { type: "string", min: 6, nullable: false },
  cpassword: { type: "equal", field: "password" },
};

const registerCheck = v.compile(registerSchema);

exports.login = async (req, res) => {
  const result = await db.User.findOne({ where: { email: req.body.email } });

  if (!result) {
    return res.status(401).json({ msg: "User not found" });
  }

  if (!result.verified) {
    return res.status(401).json({ msg: "Please verify your email first." });
  }

  if (bcrypt.compareSync(req.body.password, result.password)) {
    const token = jwt.sign(
      { userId: result.id, role: result.role, email: result.email },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.cookie("authtkn", token, {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    });

    res.status(200).json({
      msg: "Logged in successfully",
      role: result.role
    });
  } else {
    return res.status(403).json({ msg: "Invalid credentials" });
  }
};

exports.register = async (req, res) => {
  const errors = registerCheck(req.body);
  if (errors.length) {
    res.status(400).json({ msg: "Validation errors", errors  });
  } else {
    try {
      const result = await db.User.findOne({
        where: { email: req.body.email },
      });
      console.log(result);
      if (result) {
        return res.status(400).json({ msg: "Email already exists." });
      }
      req.body.password = bcrypt.hashSync(req.body.password, salt);
      req.body.emailToken = uuid();
      const user = await db.User.create(req.body);
      sendEmail(
        "pkspyder007@gmail.com",
        "verify email",
        verifyEmailTemplate(
          `${req.protocol}://${req.get("host")}/users/verifyEmail/${
            req.body.email
          }/${req.body.emailToken}`
        )
      );
      res.status(201).json({
        msg: "User created successfully.",
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, token } = req.params;

    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(400).json({ msg: "Email not found. Invalid request" });
    }

    if (user.verified) {
      return res.status(400).json({ msg: "Email already verified" });
    }

    const result = await db.User.update(
      { verified: true },
      {
        where: {
          emailToken: token,
        },
      }
    );

    if (!result[0]) {
      return res
        .status(500)
        .json({
          msg:
            "Could not verify email (INVALID TOKEN). Please contact Administrator",
        });
    }

    res.json({
      msg: "Email verified. You can Login now.",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.autoLogin = (req, res) => {
  if(req.user) {
    res.json({ loggedIn: true, role: req.user.role})
  } else {
    res.json({ loggedIn: false, role: ""})
  }
}
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var usersRouter = require("./routes/users");
var jobsRouter = require("./routes/jobs");

var app = express();

// app.use(
//   cors({
//     credentials: true,
//     origin: function (origin, callback) {
//         callback(null, [
//             'http://localhost:3000',
//             'http://localhost:5000',
//             'http://192.168.1.9:3000',
//             "*"
//         ])
//     },
//   })
// );

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://192.168.1.9:3000",
  ];
  const origin = req.headers.origin;
  console.log(origin);
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;

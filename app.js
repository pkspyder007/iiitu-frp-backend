<<<<<<< HEAD
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var usersRouter = require("./routes/users");
var jobsRouter = require("./routes/jobs");
var appRouter = require("./routes/application");

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
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));
app.set('view engine','pug')

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);

app.use("/applications", appRouter);



app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
=======
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var usersRouter = require("./routes/users");
var jobsRouter = require("./routes/jobs");
var appRouter = require("./routes/application");

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
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static(path.join(__dirname, "uploads")));
app.set("view engine", "pug");

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);

app.use("/applications", appRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
>>>>>>> 36779f02e390da3ce0843dc19b94ac5f929e59eb

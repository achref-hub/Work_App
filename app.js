var createError = require("http-errors");
var express = require("express");
//const rateLimit = require('express-rate-limit');
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const cron = require("node-cron");
const shell = require("shelljs");
var CronJob = require("cron").CronJob;
var bodyParser = require("body-parser");
const multer = require("multer");
var u = multer();
const { ObjectId } = require("mongodb");
var Availibality = require("./models/Availability");
const nodemailer = require('nodemailer');
var HistoryService = require("./services/HistoryService");
var ZoneService = require("./services/ZoneService");
var admin = require("firebase-admin");
const statistics = require("./services/StatisticsService")
const notifications = require("./services/NotificationService")
const parking = require("./services/ParkingService")
var compression = require('compression');
var helmet = require('helmet');
//const socket = require('./socket')

// const limiter = rateLimit({
//     windowMs: 1 * 60 * 1000, // 1 minute
//     max: 60, // limit each IP to 2 requests per windowMs
//     handler: function (req, res, /*next*/) {
//         return res.status(429).json({
//           error: 'You sent too many requests. Please wait a while then try again'
//         })
//     }
// })



const { socketConnection } = require('./socket');
const { sendData } = require('./socket');

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const uri =
  process.env.MONGODB_URI ||
  `mongodb://localhost/please-set-process-env-mongodb-uri`;
const db = require("monk")(uri);
const collection_availabilities = db.get("availabilities");
var app = express();
const store = new mongoDBStore({
  uri: uri,
  collection: "sessions",
});
app.use('/avataras', express.static('avatars'));
app.use('/uploads', express.static('uploads'));

app.use(helmet());
app.use(compression());
//app.use(limiter);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true ,limit: "50mb"}));//app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use("/api/notification", require("./routes/Notification"));
app.use(cookieParser());
//app.use(u.array());
app.use(express.static(path.join(__dirname, "public")));
//secret doit etre changé en production
// we can configure a cookie here by adding cookie:expires etc..
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type: application/json"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use("/api/serviceline", require("./routes/ServiceLine"));
app.use("/api/floor", require("./routes/Floor"));
app.use("/api/history", require("./routes/History"));
app.use("/api/building", require("./routes/Building"));
app.use("/api/Zone", require("./routes/Zone"));
app.use("/api/Desk", require("./routes/Desk"));
app.use("/api/User", require("./routes/User"));
app.use("/api/Grade", require("./routes/Grade"));
app.use("/api/Access", require("./routes/Access"));
app.use("/api/History", require("./routes/History"));
app.use("/api/reservation", require("./routes/Reservation"));
app.use("/api/SubServiceLine", require("./routes/SubServiceLine"));
app.use("/api/Group", require("./routes/Group"));
app.use("/api/GroupAccess", require("./routes/GroupAccess"));
app.use("/api/IndividualAccess", require("./routes/IndividualAccess"));
app.use("/api/availability", require("./routes/AvailabilityRoutes"));
app.use("/api/Statistics", require("./routes/Stats"));
app.use("/api/Request", require("./routes/Request"));
app.use("/api/Operation", require("./routes/Operation"));
app.use("/api/Balance", require("./routes/Balance"));
app.use('/api/Setting', require('./routes/Setting'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = process.env.PORT;
console.log(`Your port is ${port}`);
const mongoose = require("mongoose");
const Reservation = require("./models/Operation");
// const { start } = require("pm2");
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    const server = app.listen(port);
    socketConnection(server);
    console.log(
      `Connected to Mongo! Database name: "${result.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

 
module.exports = app;







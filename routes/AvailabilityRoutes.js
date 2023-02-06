var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Availability = require("../models/Availability");
var AvailabilityController = require("../controller/AvailabilityController");
//const  alldesks=DeskController.getDesk().data; 
const { requireSignin } = require('../controller/Authentication');

router.post("/",  function(req, res, next) {
  console.log("Availibiloty attempted");

  console.log(req.body);
 // const dateTime = new Date(req.body.date);
});

router.get("/search/:id/:dateNow",  requireSignin, AvailabilityController.getDeskavailability);
router.get("/searchAV/:id/:dateNow",  requireSignin, AvailabilityController.getAvailability);
     
router.post("/UpdatedAvailibilityParking", AvailabilityController.UpdatedAvailibilityParking);

router.put("/ublockDesks", AvailabilityController.unblockDesks);
router.get("/CancelFreeParking/:id", AvailabilityController.CancelFreeParking);

//router.put("/update", requireSignin, AvailabilityController.updateAvailibility);
module.exports = router;


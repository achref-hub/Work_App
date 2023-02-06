var AvailibilityService = require("../services/AvailabilityService");
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
exports.getDeskavailability = async function (req, res, next) {
    try {
      var content = await AvailibilityService.getDeskAvailability(req.params.id,req.params.dateNow);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Get availability Succesfully ",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  exports.getAvailability = async function (req, res, next) {
    try {
      var content = await AvailibilityService.getAvailability(req.params.id,req.params.dateNow);
      // io.getIO().emit(
      //   "desk",
      //   { action: "get", data: content },
      //   console.log("desks availability in zone retrieved with socket")
      // );
      // var content = await AvailibilityService.getAvailability()
      io.on('connection', function(socket){
        console.log("userconnected"+socket.id);

        // socket.on('action send', (msg) => {
        //    console.log(msg.toString()+"eeeeeeeeeeeeeeeeeeeeeeeeeeerrrrrrrrrrrrrrrrrrrrrr");
        //    io.emit('action emit',{
        //            "Desks":DR,
        //        });
           
        
        //   }) 
      });
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Get availability Zone Succesfully ",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };

  exports.UpdatedAvailibilityParking = async function (req, res, next) {
    try {
      var content = await AvailibilityService.UpdatedAvailibilityParking(req.body);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "update availability Succesfully ",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };

  exports.unblockDesks = async function ( req, res, next) {
    try {
      console.log("unblock");
      var content = await AvailibilityService.unblockDesks();
      return res.status(200).json({
        status: 200,
        data: content,
        message: "update availability Succesfully ",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };

  exports.CancelFreeParking = async function (req, res, next) {
    try {
      var content = await AvailibilityService.CancelFreeParking(req.params.id);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "update availability Succesfully ",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  
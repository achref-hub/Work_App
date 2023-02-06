var ReservationService = require("../services/ReservationService");
var History = require("../models/History");

const { ObjectId } = require("mongodb");

exports.getReservation = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var querytest = { "Reservation.desk" :ObjectId('6091330bb4e3d76dc042fe05'),
    'Reservation.reservationdate':"2021-10-11"
  };

    var data = await History.find(querytest);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Reservation Retrieved",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.setAvailabilty = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await ReservationService.setAvailability({}, page, limit,req.params.id,req.params.date);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully availability Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addReservation = async function (req, res, next) {
  try {
    var content = await ReservationService.addNewReservation(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "reservation",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateReservation = async function (req, res, next) {
  try {
    var content = await ReservationService.updateReservation(req.body.id, req.body.data);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Reservation Succesfully updated",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.cancelReservation = async function (req, res, next) {
  try {
    var content = await ReservationService.cancelReservation(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Reservation cancelled",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.checkIn = async function (req, res, next) {
  try {
    var content = await ReservationService.checkIn(req.body.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Checked In successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.checkOut = async function (req, res, next) {
  try {
    var content = await ReservationService.checkOut(req.body.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Checked Out successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.removeReservation = async function (req, res, next) {
  try {
    var content = await ReservationService.removeReservation(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully deleted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getReservationById = async function (req, res, next) {
  try {
    var content = await ReservationService.getReservationById(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getReservationByDeskId = async function (req, res, next) {
  try {
    var content = await ReservationService.getReservationByDeskid(req.params.QRCode);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Reservation Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getReservationByDate = async function (req, res, next) {
  try {
    var content = await ReservationService.getReservationByDate(req.params.Date);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Reservation Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getFiltredReservation = async function (req, res, next) {
  try {
    console.log("user", req.params.user)
    console.log("QR", req.params.QRCode)
    var content = await ReservationService.getFiltredReservation(req.params.user,req.params.QRCode);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "user Succesfully found",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getDeskAccess = async function (req, res, next) {
  try {
    var content = await ReservationService.getDeskAccess(req.params.user,req.params.QRCode);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "user can book this desk",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.get_Scan_Results = async function (req, res, next) {
  try {
    var content = await ReservationService.get_Scan_Results(req.params.user,req.params.Date,req.params.QRCode);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "scan Succesfully done",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getReservationCard = async function (req, res, next) {
  try {
    var content = await ReservationService.getcardreservation(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Reservation card Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.getReservationByFloor = async function (req, res, next) {
  try {
    var content = await ReservationService.getReservationByFloor(req.params.id);
    return res.status(200).json(content);
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.checkReservation = async function (req, res, next) {
  try {
    var content = await ReservationService.checkReservation(req.params.user,req.params.reservationdate,req.params.timeslot,req.params.resource);
    console.log("content",content.toString())
    return res.status(200).json({
      status: 200,
      data: content,
      message: "check reservation",
    });
  } catch (e) {
    return res.status(400).json({
      status: e,
      message: e.message,
    });
  }
};

exports.addNewReservations = async function (req, res, next) {
  try {
    var content = await ReservationService.addNewReservations(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "reservations added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: e,
      message: e.message,
    });
  }
};
exports.getAvailabilityZones = async function (req, res, next) {
  try {
    var content = await ReservationService.getAvailabilityZones(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getAvailabilityZones added succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: e,
      message: e.message,
    });
  }
};
exports.AddOperations = async function (req, res, next) {
  try {
    var content = await ReservationService.AddOperations();
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Operation added succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: e,
      message: e.message,
    });
  }
};

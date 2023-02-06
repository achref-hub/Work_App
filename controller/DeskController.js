var DeskService = require("../services/DeskService");

exports.getDesk = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await DeskService.getDesk({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Desks Retrieved",
    });
  } catch (e) {
   
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  
  }
};





exports.addNewDesk = async function (req, res, next) {
  try {
    var content = await DeskService.addNewDesk(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Desk added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateDesk = async function (req, res, next) {
  try {
    var content = await DeskService.updateDesk(req.params.id, req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully updated",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};






exports.removeDesk = async function (req, res, next) {
  try {
    var content = await DeskService.removeDesk(req.params.id);
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

exports.getDeskByid = async function (req, res, next) {
  try {
    var content = await DeskService.getDeskByid(req.params.id);
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


exports.getNumberofReservations = async function (req, res, next) {
  try {
    var content = await DeskService.getNumberOfReservations(req.params.id,req.params.start_date,req.params.end_date);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of reservations successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberofCheckins = async function (req, res, next) {
  try {
    var content = await DeskService.getNumberOfCheckins(req.params.id,req.params.start_date,req.params.end_date);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of checkins successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberofCancellations = async function (req, res, next) {
  try {
    var content = await DeskService.getNumberOfCancellations(req.params.id,req.params.start_date,req.params.end_date);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of cancellations successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getDeskByFloor = async function (req, res, next) {
  try {
    var content = await DeskService.getDeskByFloor(req.params.id);
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

exports.getParkings = async function (req, res, next) {
  try {
    var content = await DeskService.getParkings(req.params.id);
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



exports.unblockDesks = async function ( req, res, next) {
  try {
    console.log("unblock");
    var content = await DeskService.unblockDesks();
    return res.status(200).json({
      status: 200,
      data: content,
      message: "update desks Succesfully ",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
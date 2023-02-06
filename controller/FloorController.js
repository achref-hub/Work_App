var FloorService = require("../services/FloorService");

exports.getFloor = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await FloorService.getFloor({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Floors Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addNewFloor = async function (req, res, next) {
  try {
    var content = await FloorService.addNewFloor(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Floor added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateFloor = async function (req, res, next) {
  try {
    var content = await FloorService.updateFloor(req.params.id, req.body);
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

exports.removeFloor = async function (req, res, next) {
  try {
    var content = await FloorService.removeFloor(req.params.id);
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

exports.getFloorByid = async function (req, res, next) {
  try {
    var content = await FloorService.getFlooryid(req.params.id);
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

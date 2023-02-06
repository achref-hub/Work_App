var SubServiceLineService = require("../services/SubServiceLineService");

exports.getSubServiceLine = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await SubServiceLineService.getSubServiceLine({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully sub service lines Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getAccessList = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await SubServiceLineService.getAccessList({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully access lists Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addNewSubServiceLine = async function (req, res, next) {
  try {
    var content = await SubServiceLineService.addNewSubServiceLine(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Sub User Group added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateSubServiceLine = async function (req, res, next) {
  try {
    var content = await SubServiceLineService.updateSubServiceLine(req.params.id, req.body);
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

exports.removeSubServiceLine = async function (req, res, next) {
  try {
    var content = await SubServiceLineService.removeSubServiceLine(req.params.id);
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

exports.getSubServiceLineById = async function (req, res, next) {
  try {
    var content = await SubServiceLineService.getSubServiceLineById(req.params.id);
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

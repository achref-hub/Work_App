var GroupService = require("../services/GroupService");

exports.getGroup = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await GroupService.getGroup({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully groups Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.addGroup = async function (req, res, next) {
  try {
    var content = await GroupService.addGroup(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Group added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateGroup = async function (req, res, next) {
  try {
    var content = await GroupService.updateGroup(req.params.id, req.body.data);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully updated group",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.removeGroup = async function (req, res, next) {
  try {
    var content = await GroupService.removeGroup(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully deleted group",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getGroupById = async function (req, res, next) {
  try {
    var content = await GroupService.getGroupById(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully found group",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

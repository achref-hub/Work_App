var GradeService = require("../services/GradeService");

exports.getGrades = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await GradeService.getGrades({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully grades Retrieved",
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
    var data = await GradeService.getAccessList({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully access list Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addGrade = async function (req, res, next) {
  try {
    var content = await GradeService.addGrade(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Grade added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateGrade = async function (req, res, next) {
  try {
    var content = await GradeService.updateGrade(req.params.id, req.body);
    return await res.status(200).json({
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

exports.removeGrade = async function (req, res, next) {
  try {
    var content = await GradeService.removeGrade(req.params.id);
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

exports.getGradeById = async function (req, res, next) {
  try {
    var content = await GradeService.getGradeById(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully found grade",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getIdByName = async function (req, res, next) {
  try {
    var content = await GradeService.getIdByName(req.params.name);
    return res.status(200).json({
      status: 200,
      data: content[0]._id,
      message: "Succesfully found grade",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
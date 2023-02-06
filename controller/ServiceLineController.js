var ServiceLineService = require("../services/ServiceLineService");

exports.getServiceLine = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await ServiceLineService.getServiceLine({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully service lines Retrieved",
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
    var data = await ServiceLineService.getAccessList({}, page, limit);
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

exports.addNewServiceLine = async function (req, res, next) {
  try {
    var content = await ServiceLineService.addNewServiceLine(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "UserGroup added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateServiceLine = async function (req, res, next) {
  try {
    var content = await ServiceLineService.updateServiceLine(req.params.id, req.body);
    console.log(req.body);
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

exports.removeServiceLine = async function (req, res, next) {
  try {
    var content = await ServiceLineService.removeServiceLine(req.params.id);
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

exports.getServiceLineById = async function (req, res, next) {
  try {
    var content = await ServiceLineService.getServiceLineById(req.params.id);
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


exports.getIdByName = async function (req, res, next) {
  try {
    var content = await ServiceLineService.getIdByName(req.params.name);
    return res.status(200).json({
        data: content[0]._id,
      }); 
    // res.status(200).json({
    //   status: 200,
    //   data: content[0]._id,
    //   message: "Succesfully found",
    // });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

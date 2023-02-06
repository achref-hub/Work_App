var AccessService = require("../services/AcessService");

exports.getAccess = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await AccessService.getAccess({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Access List Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.changeAccessByUserId = async function (req, res, next) {
  try {
    var content = await AccessService.changeAccessByUserId(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Access for this user changed successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.changeAccessByGrade = async function (req, res, next) {
    try {
      var content = await AccessService.changeAccessByGrade(req.body);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Access for this grade changed successfully",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
};

exports.changeAccessByServiceLine = async function (req, res, next) {
    try {
      var content = await AccessService.changeAccessByServiceLine(req.body);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Access for this Service Line changed successfully",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
};

exports.changeAccessBySubServiceLine = async function (req, res, next) {
    try {
      var content = await AccessService.changeAccessBySubServiceLine(req.body);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Access for this Sub Service Line changed successfully",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };

exports.getAccessById = async function (req, res, next) {
  try {
    var content = await AccessService.getAccessById(req.params.id);
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

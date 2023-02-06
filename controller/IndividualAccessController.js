var IndividualAccessService = require("../services/IndividualAccessService");

exports.getIndividualAccess = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await IndividualAccessService.getIndividualAccess({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully individual Access List Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addAccessToUser = async function (req, res, next) {
  try {
    var content = await IndividualAccessService.addAccessToUser(req.body.data);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Individual Access to zone granted successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.deleteAccessToUser = async function (req, res, next) {
  try {
    var content = await IndividualAccessService.deleteAccessToUser(req.params.User, req.params.Zone);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Individual Access to zone updated successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getIndividualAccessById = async function (req, res, next) {
  try {
    
    var content = await IndividualAccessService.getIndividualAccessById(req.params.id);
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

exports.getIndividualAccessByUser = async function (req, res, next) {
    try {
      if (req.user.id != req.params.id && !req.user.admin) {
        return res.status(400).json({
          status: 400,
          message: 'Not authorized',
        });
      }
      var content = await IndividualAccessService.getIndividualAccessByUser(req.params.id);
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

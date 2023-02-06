var GroupAccessService = require("../services/GroupAccessService");
var GroupService = require("../services/GroupService");


exports.getGroupAccess = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await GroupAccessService.getGroupAccess({}, res);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Group Access List Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addAccessToGroup = async function (req, res, next) {
  try {
    var content = await GroupAccessService.addAccessToGroup(req.body.data);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Group Access to zone granted successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.updateAccessGroup = async function (req, res, next) {
  try {
    var content = await GroupAccessService.updateAccessGroup(req.params.id, req.body.data);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Group Access to zone granted successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getGroupAccessById = async function (req, res, next) {
  try {
    var content = await GroupAccessService.getGroupAccessById(req.params.id);
   
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

exports.getGroupAccessByGroup = async function (req, res, next) {
    try {
      var content = await GroupAccessService.getAccessByGroup(req.group);
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
  
exports.getGroupAccessByUser = async function (req, res, next) {
  try {
    var content = await GroupAccessService.getGroupAccessByUser(req.params.id);
   // console.log("SESSION",req.session.user)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully found",
    });
  } catch (e) {
    //console.log("SESSION USER", req.session.user._id);
    return res.status(400).json({      
      status: 400,
      message: e.message,
    });
  }
};

exports.getCardAccess = async function (req, res, next) {
  try {
    var content = await GroupAccessService.getCardAccess(req.params.Group);   
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully retrieved card access",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.removeGroupAccess = async function (req, res, next) {
  try {
    var groupaccess = await GroupAccessService.getGroupAccessById(req.params.id)
    console.log("groupaccess", groupaccess.Group)
    var content = await GroupService.removeGroup(groupaccess.Group);

    var content = await GroupAccessService.removeGroupAccess(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "GroupAccess Succesfully deleted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
var BuildingService = require("../services/BuildingService");

exports.getBuilding = async function (req, res, next) {
   
    var page = req.params.page ? req.params.page : 1;
    var limit = req.params.limit ? req.params.limit : 10;
    try {
      var data = await BuildingService.getBuilding({}, page, limit);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Succesfully buildings Retrieved",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
};
exports.addNewBuilding = async function (req, res, next) {
    try {
      var content = await BuildingService.addNewBuilding(req.body);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Building added succesfully",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
};

exports.updateBuilding = async function (req, res, next) {
    try {
      var content = await BuildingService.updateBuilding(req.params.id, req.body);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Building Succesfully updated",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
};


exports.removeBuilding = async function (req, res, next) {
    try {
      var content = await BuildingService.removeBuilding(req.params.id);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Building deleted",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
};
  
exports.getBuildingById = async function (req, res, next) {
    try {
      var content = await BuildingService.getBuildingById(req.params.id);
      return res.status(200).json({
        status: 200,
        data: content,
        message: "Building Succesfully found",
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
};
  
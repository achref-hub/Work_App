var ZoneService = require("../services/ZoneService");
//const io = require("../socket");

exports.getZone = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await ZoneService.getZone({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Zones Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addNewZone = async function (req, res, next) {
  try {
    var content = await ZoneService.addNewZone(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Zone added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.updateZone = async function (req, res, next) {
  try {
    var content = await ZoneService.updateZone(req.params.id, req.body);
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


exports.removeZone = async function (req, res, next) {
  try {
    var content = await ZoneService.removeZone(req.params.id);
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

exports.getZoneByid = async function (req, res, next) {
  try {
    var content = await ZoneService.getZoneyid(req.params.id);
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
exports.getZoneAvailibility = async function (req, res, next) {
  try {
    var content = await ZoneService.getZoneAvailibility(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully found zone availibility",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getZoneName = async function (req, res, next) {
  try {
    var content = await ZoneService.getZoneName(id);
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

exports.getDesksinZone = async function (req, res, next) {
  try {
    var content = await ZoneService.getDesksinZone(req.params.id);
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

exports.getAccesZone = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    // if (req.user.id != req.params.id && !req.user.admin) {
    //   return res.status(400).json({
    //     status: 400,
    //     message: 'Not authorized',
    //   });
    // }
    var data = await ZoneService.getAccesZone({}, page, limit,req.params.id);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully zone Acess Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getdesksavailibility = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await ZoneService.getdesksAvailibility(
      {},
      page,
      limit,
      req.params.id,
      req.params.date
    );
    /*io.getIO().emit(
      "api/Zone/getdesksavailibility/" + req.params.id + "/" + req.params.date,
      { action: "get", data: data },
      console.log("desks availability in zone retrieved with socket")
    );*/
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully desks availibility Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getAvailabilityZones = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await ZoneService.getAvailabilityZones(
req.body
    );
    /*io.getIO().emit(
      "api/Zone/getdesksavailibility/" + req.params.id + "/" + req.params.date,
      { action: "get", data: data },
      console.log("desks availability in zone retrieved with socket")
    );*/
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully desks availibility Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

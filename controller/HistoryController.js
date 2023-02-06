var HistoryService = require("../services/HistoryService");

exports.getHistory = async function (req, res, next) {
  // Validate request parameters, queries using express-validator
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await HistoryService.getHistory({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Historys Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getCardHistoryByUserid = async function (req, res, next) {
  try {
    if (req.user.id != req.params.id && !req.user.admin) {
      
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
    }
    var content = await HistoryService.getCardHistoryByUserid(req.params.id);
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
exports.addNewHistory = async function (req, res, next) {
  try {
    var content = await HistoryService.addNewHistory(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "History added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateHistory = async function (req, res, next) {
  try {
    var content = await HistoryService.updateHistory(req.body.id, req.body);
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
exports.removeHistory = async function (req, res, next) {
  try {
    var content = await HistoryService.removeHistory(req.params.id);
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
exports.getHistoryByUserid = async function (req, res, next) {
  try {
    if (req.user.id != req.params.id && !req.user.admin) {
      
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
    }

    var content = await HistoryService.getHistoryByUserid(req.params.id);
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


exports.getUserHistoryByDate = async function (req, res, next) {
  try {
    if (req.user.id != req.params.id && !req.user.admin) {
      
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
    }
    var content = await HistoryService.getUserHistoryByDate(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );

    return res.status(200).json({
      status: 200,
      data: content,
      message: "gettinguser history by date successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getReservationByDeskId = async function (req, res, next) {
  try {
    var content = await HistoryService.getHistoryByDeskid(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "history for this desk Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getDeskHistoryByDate = async function (req, res, next) {
  try {
    var content = await HistoryService.getDeskHistoryByDate(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );

    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting desk history by date successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberOfReservations = async function (req, res, next) {
  try {
    var content = await HistoryService.getNumberOfReservations();
    return res.status(200).json({
      status: 200,
      data: content,
      message: "number of reservations",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
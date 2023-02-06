var Notification = require("../models/Notification");
var NotificationService = require("../services/NotificationService");








exports.addNotification = async function (req, res, next) {
  try {
    var content = await NotificationService.addNotification(req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Desk added succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getNotificationByUser = async function (req, res, next) {
  try {
    var content = await NotificationService.getNotificationByUser(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully found Notification",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


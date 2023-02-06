var SettingService = require('../services/SettingService');

exports.addBalanceSettings = async function (req, res, next) {
  try {
    var data = await SettingService.addBalanceSettings(req.body);
    return res.status(200).json({
      status: 200,
      data: data,
      message: 'Balances added Succesfully',
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getSettingsType = async function (req, res, next) {
  try {
    var leave = await SettingService.getSettingsByType(req.body);
    console.log(leave,"aaaa");
    return res.status(200).json({
      status: 200,
      data: leave,
      message: 'Balance added Succesfully',
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getSettingsSlot = async function (req, res, next) {
  try {
    var slot = await SettingService.getSettingsByslot(req.body);
    console.log(slot,"slot");
    return res.status(200).json({
      status: 200,
      data: slot,
      message: 'Slot added Succesfully',
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getSettingsName = async function (req, res, next) {
  try {
    var data = await SettingService.getSettingsByName(req.params.name);
    return res.status(200).json({
      status: 200,
      data: data,
      message: 'Balance added Succesfully',
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getSettings = async function (req, res, next) {
  try {
    var data = await SettingService.getSettings(req);
    return res.status(200).json({
      status: 200,
      data: data,
      message: 'Settings',
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getBalances = async function (req, res, next) {
  try {
    var data = await SettingService.getBalances();
    return res.status(200).json({
      status: 200,
      data: data,
      message: 'Settings',
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.updateSettings = async function (req, res, next) {
  try {
    var data = await SettingService.updateSettings(
      req.params.id,
      req.body,
    );
    return res.status(200).json({
      status: 200,
      data: data,
      message: 'Balance Settings updated Succesfully',
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

const express = require('express');
const router = express.Router();

const SettingController = require('../controller/SettingController');

const {
  requireSignin,
  adminMiddleware,
} = require('../controller/Authentication');

router.post('/addBalanceSettings', SettingController.addBalanceSettings);
router.put('/updateSetting/:id', SettingController.updateSettings);
router.get('/getSettingsName/:name', SettingController.getSettingsName);
router.get('/getSettings', requireSignin, SettingController.getSettings);
router.get('/getBalances', requireSignin, SettingController.getBalances);
router.get('/getSettingsType',SettingController.getSettingsType);
router.get('/getSettingsSlot',SettingController.getSettingsSlot);


module.exports = router;

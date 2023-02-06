const express = require("express");
const router = express.Router();
var ZoneController = require("../controller/ZoneController.js");
const { requireSignin } = require('../controller/Authentication');

router.get("/", ZoneController.getZone);

router.post("/add", requireSignin, ZoneController.addNewZone);
router.put("/update/:id", requireSignin, ZoneController.updateZone);
router.delete("/remove/:id",requireSignin, ZoneController.removeZone);

router.get("/search/:id", requireSignin, ZoneController.getZoneByid);
router.get("/getdesks/:id", requireSignin, ZoneController.getDesksinZone);
router.get("/getAcesszone/:id", requireSignin,ZoneController.getAccesZone);
router.get("/getdesksavailibility/:id/:date", requireSignin, ZoneController.getdesksavailibility);
router.get("/getAvailabilityZones", requireSignin, ZoneController.getAvailabilityZones);


module.exports = router;
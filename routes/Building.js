const express = require("express");
const router = express.Router();
var BuildingController = require("../controller/BuildingController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/",  BuildingController.getBuilding);
router.post("/addbuilding",  BuildingController.addNewBuilding);
router.put("/updatebuilding/:id",  BuildingController.updateBuilding);
router.delete("/removebuilding/:id",  BuildingController.removeBuilding);
router.get("/searchbuilding/:id", BuildingController.getBuildingById);

module.exports = router;

const express = require("express");
const router = express.Router();
var FloorController = require("../controller/FloorController.js");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');


router.get("/", FloorController.getFloor);
router.post("/add", FloorController.addNewFloor);
router.put("/update/:id", FloorController.updateFloor);
router.delete("/remove/:id", FloorController.removeFloor);
router.get("/search/:id", FloorController.getFloorByid);
 
 
module.exports = router; 

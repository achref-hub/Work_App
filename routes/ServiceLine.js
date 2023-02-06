const express = require("express");
const router = express.Router();
var ServiceLineController = require("../controller/ServiceLineController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/", requireSignin, ServiceLineController.getServiceLine);

router.post("/add", requireSignin, ServiceLineController.addNewServiceLine);
router.put("/update/:id", requireSignin, ServiceLineController.updateServiceLine);
router.delete("/remove/:id", requireSignin, ServiceLineController.removeServiceLine);
router.get("/search/:id", requireSignin, ServiceLineController.getServiceLineById);
router.get("/accessList", requireSignin, ServiceLineController.getAccessList);
router.get("/getId/:name", requireSignin, ServiceLineController.getIdByName);

module.exports = router;

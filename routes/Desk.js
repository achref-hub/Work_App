const express = require("express");
const router = express.Router();
var DeskController = require("../controller/DeskController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/", requireSignin, DeskController.getDesk);
router.post("/add", requireSignin, adminMiddleware, DeskController.addNewDesk);
router.put("/update/:id", requireSignin, adminMiddleware, DeskController.updateDesk);
router.delete("/remove/:id", requireSignin, adminMiddleware, DeskController.removeDesk);
router.get("/search/:id", requireSignin, DeskController.getDeskByid);
router.get("/nbofreservations/:id/:start_date/:end_date",  requireSignin, DeskController.getNumberofReservations);
router.get("/nbofchekins/:id/:start_date/:end_date",  requireSignin, DeskController.getNumberofCheckins);
router.get("/nbofcancellations/:id/:start_date/:end_date",  requireSignin, DeskController.getNumberofCancellations);
router.get("/floor/:id", requireSignin, DeskController.getDeskByFloor);
router.get("/parking", requireSignin, DeskController.getParkings);

router.put("/ublockDesks", requireSignin, DeskController.unblockDesks);

module.exports = router;

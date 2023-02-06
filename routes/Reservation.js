const express = require("express");
const router = express.Router();
var ReservationController = require("../controller/ReservationController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/",ReservationController.getReservation);
router.get("/setavailability/:date", requireSignin,  ReservationController.setAvailabilty);
router.post("/add", requireSignin,  ReservationController.addReservation);
router.post("/update", requireSignin,  ReservationController.updateReservation);
router.post("/cancel/:id", requireSignin,  ReservationController.cancelReservation);
router.post("/checkIn", requireSignin,  ReservationController.checkIn);
router.post("/checkOut",requireSignin,  ReservationController.checkOut);
router.delete("/remove/:id", requireSignin, ReservationController.removeReservation);
router.get("/search/:id", requireSignin, ReservationController.getReservationById);
router.get("/getReservationByDeskId/:QRCode",requireSignin, ReservationController.getReservationByDeskId);
router.get("/getReservationByDate/:Date",requireSignin, ReservationController.getReservationByDate);
router.get("/getFiltredReservation/:user/:QRCode",requireSignin, ReservationController.getFiltredReservation);
router.get("/getDeskAccess/:user/:QRCode",requireSignin, ReservationController.getDeskAccess);
router.get("/get_Scan_Results/:user/:Date/:QRCode",requireSignin, ReservationController.get_Scan_Results);
router.get("/card/:id", requireSignin, ReservationController.getReservationCard);
router.get("/getReservationByFloor/:id", requireSignin, ReservationController.getReservationByFloor);
router.get("/checkreservation/:user/:reservationdate/:timeslot/:resource",requireSignin ,ReservationController.checkReservation);
router.post("/addReservations", requireSignin,ReservationController.addNewReservations);
router.post("/getAVZones", requireSignin,ReservationController.getAvailabilityZones);
router.get("/AddOperations" ,ReservationController.AddOperations);


module.exports = router;

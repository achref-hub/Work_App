const express = require("express");
const router = express.Router();

const OperationController = require('../controller/OperationController')



const {
  requireSignin,
  adminMiddleware,

} = require("../controller/Authentication");

router.post("/addNewLeave" , OperationController.addNewLeave);
router.get("/getLeavesBySlot",OperationController.getLeaveBySlot);
router.post("/addOperation", requireSignin , OperationController.addOperation );
router.get("/getOperationsByManager/:id", requireSignin , OperationController.getOperationsByManager );
router.get("/getOperationsByUser/:id", requireSignin , OperationController.getOperationsByUser );
router.get("/getOperationsByRequest/:id", requireSignin , OperationController.getOperationsByRequest );
router.delete("/deleteOperation/:id",requireSignin , OperationController.deleteOperation );
router.delete("/deleteLeave/:id", OperationController.removeLeave);
router.get("/getLeaveByOperation/:id" , OperationController.getLeaveByOperation );
router.put("/updateLeaveByOperation/:id", OperationController.updateLeave);


router.post("/addNewReservation" , OperationController.addNewReservation );
router.get("/checkReservation/:user/:reservationdate/:timeslot/:resource",requireSignin ,OperationController.checkReservation);
router.post("/addNewReservations", requireSignin ,OperationController.addNewReservations );
router.get("/ScanQR/:user/:QRcode",requireSignin ,OperationController.ScanQR);
router.post("/getOperations", requireSignin, OperationController.getAllOperations );
router.post("/checkInParking", OperationController.checkInParking );
router.post("/freeParking", OperationController.freeParking );
router.get("/checkoutParking/:id", OperationController.checkoutParking);


module.exports = router;



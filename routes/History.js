const express = require("express");
const router = express.Router();
var HistoryController = require("../controller/HistoryController");
const {
  requireSignin,
  adminMiddleware,
} = require("../controller/Authentication");

// router.get("/", requireSignin, adminMiddleware, HistoryController.getHistory);
router.post("/add", requireSignin, adminMiddleware, HistoryController.addNewHistory);
router.post("/update", requireSignin, adminMiddleware, HistoryController.updateHistory);
//router.delete("/remove/:id", requireSignin,adminMiddleware,HistoryController.removeHistory);
//router.get("/search/:id",requireSignin, HistoryController.getHistoryByid);

router.get("/search/:id", requireSignin, HistoryController.getHistoryByUserid);
router.get("/cardhistory/:id", requireSignin, HistoryController.getCardHistoryByUserid);
router.delete("/remove/:id", requireSignin, adminMiddleware, HistoryController.removeHistory);
router.get(
  "/userhistorybydate/:id/:start_date/:end_date", requireSignin, 
  HistoryController.getUserHistoryByDate
);
// router.get(
//   "/getReservationByDeskId/:id", requireSignin, 
//   HistoryController.getReservationByDeskId
// );
// router.get(
//   "/deskhistorybydate/:id/:start_date/:end_date", requireSignin, 
//   HistoryController.getDeskHistoryByDate
// );
// router.get("/nbofreservations", requireSignin,  HistoryController.getNumberOfReservations);

module.exports = router;

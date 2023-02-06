const express = require("express");
const router = express.Router();
var StatsController = require("../controller/StatsController.js");

const { requireSignin } = require('../controller/Authentication');




router.get("/totalstats", requireSignin, StatsController.getTotalStats);
router.get("/slStats", requireSignin, StatsController.getSLStats);
router.get("/monthStats/:start_date", requireSignin, StatsController.getMonthStats);
router.get("/weekStats/:start/:end", requireSignin, StatsController.getWeekStats);
router.get("/dailyStats/:date", requireSignin, StatsController.getSayStats);
router.get("/getAllStats/",  StatsController.getAllStats);
router.get("/getSLOperations/",  StatsController.getSLOperations);
router.get("/getSLReservations/",  StatsController.getSLReservations);

router.get("/getSystemCancel/",  StatsController.getSystemCancel);
router.get("/getSLReservation/",  StatsController.getSLReservation);
router.get("/getSLCancelUser/",  StatsController.getSLCancelUser);
router.get("/getSLCancelSystem/",  StatsController.getSLCancelSystem);
router.get("/getTotalOperations/",  StatsController.getTotalOperations);
router.get("/getSLStatBars/",  StatsController.getSLStatBars);


///////////////////////////////////User stat routes
//routes to calculate stat for user
router.get("/getDailyUserReservation/",  StatsController.getDailyUserReservation);
router.get("/getWeeklyUserReservation/",  StatsController.getWeeklyUserReservation);
router.get("/getMonthlyUserReservation/",  StatsController.getMonthlyUserReservation);

//routes to fetch stat for user
router.get("/getUsersWeekStat/:start_date/:end_date",  StatsController.getUsersWeekStat);
router.get("/getUsersDayStat/:date",  StatsController.getUsersDayStat);
router.get("/getUsersMonthStat/:month",  StatsController.getUsersMonthStat);
router.get("/getUserIdMonthStat/:id/:month",  StatsController.getUserIdMonthStat);
router.get("/getUserIdALLStat/:id",  StatsController.getUserIdALLStat);

//routes to fetch stat for Resources
router.get("/getRessourcesMonthStat/:month",  StatsController.getRessourcesMonthStat);
router.get("/getRessourcesWeekStat/:start_date/:end_date",  StatsController.getRessourcesWeekStat);
router.get("/getRessourcesDayStat/:date",  StatsController.getRessourcesDayStat);
router.get("/getDailyOperations/:date",  StatsController.getDailyOperations);




module.exports = router;

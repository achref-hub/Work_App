const express = require("express");
const router = express.Router();

const BalanceController = require('../controller/BalanceController')



const {
  requireSignin,
  adminMiddleware,

} = require("../controller/Authentication");

router.post("/addBalance", requireSignin, adminMiddleware, BalanceController.addUserBalance );
router.post("/addUsersBalance", requireSignin, adminMiddleware, BalanceController.addUsersBalance );
router.get("/getUserBalance/:id", requireSignin, BalanceController.getUserBalance );
router.put("/update/:id", requireSignin, adminMiddleware, BalanceController.updateBalance );





module.exports = router;



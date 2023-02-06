const express = require("express");
const router = express.Router();

const NotificationController = require('../controller/NotificationController')



const {
  requireSignin,
  adminMiddleware,

} = require("../controller/Authentication");

router.post("/addNotification", NotificationController.addNotification );
router.get("/getNotificationByUser/:id", NotificationController.getNotificationByUser );





module.exports = router;



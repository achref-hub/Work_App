const express = require("express");
const router = express.Router();

const RequestController = require('../controller/RequestController')



const {
  requireSignin,
  adminMiddleware,

} = require("../controller/Authentication");

router.post("/addRequest", requireSignin ,RequestController.addRequest );
router.delete("/cancelRequest/:id", requireSignin ,RequestController.cancelRequest );
router.get("/getRequestsByUser/:id", requireSignin ,RequestController.getRequestsByUser );
router.get("/getPendingRequestsByManager/:id",requireSignin , RequestController.getPendingRequestsByManager );
router.get("/getRequestByID/:id", requireSignin ,RequestController.getRequestByID );
router.put("/updateRequest/:id", requireSignin ,RequestController.updateRequest );
router.post("/addNewRequest", requireSignin ,RequestController.addNewRequest );




module.exports = router;



const express = require("express");
const router = express.Router();
var GroupAccessController = require("../controller/GroupAccessController");
const { 
    requireSignin, 
    adminMiddleware, 
    } = require("../controller/Authentication");

router.get("/", requireSignin, adminMiddleware, GroupAccessController.getGroupAccess);
router.post("/add", requireSignin, adminMiddleware, GroupAccessController.addAccessToGroup);
// router.get("/search/:id", requireSignin, GroupAccessController.getGroupAccessById);
// router.get("/searchByGroup", requireSignin, GroupAccessController.getGroupAccessByGroup);
// router.get("/searchByUser/:id", requireSignin, GroupAccessController.getGroupAccessByUser);
// router.get("/getcardaccess/:Group", requireSignin, GroupAccessController.getCardAccess);
router.post("/delete/:id", requireSignin, adminMiddleware, GroupAccessController.removeGroupAccess);
router.post("/update/:id", requireSignin, adminMiddleware, GroupAccessController.updateAccessGroup);

module.exports = router;

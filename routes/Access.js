const express = require("express");
const router = express.Router();
var AccessController = require("../controller/AccessController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/",requireSignin, adminMiddleware, AccessController.getAccess);
router.post("/byGrade", requireSignin, adminMiddleware, AccessController.changeAccessByGrade);
router.post("/byUser",requireSignin, adminMiddleware, AccessController.changeAccessByUserId);
router.post("/byServiceLine",requireSignin, adminMiddleware, AccessController.changeAccessByServiceLine);
router.post("/bySubServiceLine",requireSignin, adminMiddleware, AccessController.changeAccessBySubServiceLine);
router.get("/search/:id",requireSignin, adminMiddleware, AccessController.getAccessById);

module.exports = router;

const express = require("express");
const router = express.Router();
var GroupContoller = require("../controller/GroupController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/", requireSignin, GroupContoller.getGroup);

router.post("/add", requireSignin, adminMiddleware, GroupContoller.addGroup);
router.put("/update/:id", requireSignin, adminMiddleware, GroupContoller.updateGroup);
router.delete("/remove/:id", requireSignin, adminMiddleware, GroupContoller.removeGroup);
router.get("/search/:id", requireSignin, GroupContoller.getGroupById);


module.exports = router;

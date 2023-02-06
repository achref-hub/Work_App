const express = require("express");
const router = express.Router();
var SubServiceLineController = require("../controller/SubServiceLineController");
const { requireSignin } = require('../controller/Authentication');

router.get("/",requireSignin, SubServiceLineController.getSubServiceLine);

router.post("/add", requireSignin, SubServiceLineController.addNewSubServiceLine);
router.put("/update/:id", requireSignin, SubServiceLineController.updateSubServiceLine);
router.delete("/remove/:id",requireSignin, SubServiceLineController.removeSubServiceLine);
router.get("/search/:id",requireSignin, SubServiceLineController.getSubServiceLineById);
router.get("/accessList", requireSignin, SubServiceLineController.getAccessList);

module.exports = router;

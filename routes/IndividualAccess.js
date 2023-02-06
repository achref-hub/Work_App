const express = require("express");
const router = express.Router();
var IndividualAccessController = require("../controller/IndividualAccessController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

// router.get("/",requireSignin, adminMiddleware, IndividualAccessController.getIndividualAccess);
router.post("/add",requireSignin, adminMiddleware,  IndividualAccessController.addAccessToUser);
router.post("/delete/:User/:Zone",requireSignin, adminMiddleware, IndividualAccessController.deleteAccessToUser);
router.get("/search/:id", requireSignin, IndividualAccessController.getIndividualAccessById);
router.get("/searchByUser/:id", requireSignin, IndividualAccessController.getIndividualAccessByUser);

module.exports = router;

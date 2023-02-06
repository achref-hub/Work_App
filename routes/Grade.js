const express = require("express");
const router = express.Router();
var GradeController = require("../controller/GradeController");
const { requireSignin, adminMiddleware } = require('../controller/Authentication');

router.get("/", requireSignin, GradeController.getGrades);


router.post("/add", requireSignin, adminMiddleware, GradeController.addGrade);
router.put("/update/:id", requireSignin, adminMiddleware, GradeController.updateGrade);
router.delete("/remove/:id",requireSignin, adminMiddleware, GradeController.removeGrade);

router.get("/search/:id", requireSignin, GradeController.getGradeById);
router.get("/AccessList", requireSignin, GradeController.getAccessList);
router.get("/getId/:name", requireSignin, GradeController.getIdByName);


module.exports = router;

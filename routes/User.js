const express = require("express");
const router = express.Router();
const multer = require("multer");

var UserController = require("../controller/UserController.js");
const {
  validSign,
  validLogin,
  forgotPasswordValidator,
  resetPasswordValidator,
} = require("../helpers/valid");

const {
  requireSignin,
  adminMiddleware,
  signinController,
  registerController,
  Logout,
  forgotPasswordController,
  signinAdmin,
  signinUser,
  refreshToken,
  refreshAdminToken,
  signinValidator
} = require("../controller/Authentication");

router.post("/login", signinController);
router.post("/loginAdmin", signinAdmin);
router.post("/loginUser", signinUser);
router.post("/loginValidator", signinValidator);


router.post("/auth/refresh", refreshToken);
router.post("/auth/refreshAdminToken", refreshAdminToken);




router.post("/logout", Logout);
router.post("/signup", requireSignin, adminMiddleware,  registerController);
router.put("/updatemyprofile/:id", requireSignin, UserController.updateController);
router.put("/updateuserprofile/:id", requireSignin, adminMiddleware, UserController.AdminupdateController);
router.put("/adminUpdateProfile/:id", requireSignin, UserController.AdminUpdateProfile);

router.get("/search/:id", requireSignin, UserController.getUserById);
router.get(
  "/nbofreservations/:id/:start_date/:end_date", requireSignin, 
  UserController.getNumberofReservations
);
router.get(
  "/nbofwfh/:id/:start_date/:end_date", requireSignin, 
  UserController.getNumberofWfh
);
router.get(
  "/nbofchekins/:id/:start_date/:end_date", requireSignin, 
  UserController.getNumberofCheckins
);
router.get(
  "/nbofcancellations/:id/:start_date/:end_date", requireSignin, 
  UserController.getNumberofCancellations
);
//router.put('/update', requireSignin, upload.single("photo"),updateController);
//router.put('/admin/update', requireSignin, adminMiddleware, updateController);
router.post("/add", UserController.addUser);
router.delete("/delete/:id", requireSignin,  UserController.removeUser);
router.put("/block/:id", requireSignin, adminMiddleware, UserController.blockUser);
router.get("/", requireSignin, adminMiddleware,  UserController.getUsersAdmin);

router.get("/AccessList", requireSignin, UserController.getAccessList);
router.post("/image",UserController.ModifierImage);
router.post("/forgotPasswd",forgotPasswordController);
router.post("/NewPasswd/:id",UserController.updatepassword);
router.get("/getUsers", UserController.getUsers);

router.get("/searchProfile/:email", requireSignin, UserController.getUserProfile);

router.get("/deletUserHistory/",  UserController.deletUserHistory);
router.get("/getManagers",  requireSignin, adminMiddleware, UserController.getManagers);
router.get("/getValidators",  requireSignin, UserController.getValidators);

router.get("/getAllUsers", requireSignin, UserController.getAllUsers);
// router.get("/getALLUser",  UserController.getALLUser);
router.get("/getTeamManager/:id", requireSignin, UserController.getTeamManager);
router.get("/setManagersToUsers",  UserController.setManagersToUsers);
router.get("/setValidatorsToUsers",  UserController.setValidatorsToUsers);
router.get("/fetchValidators",  requireSignin, UserController.fetchValidators);


module.exports = router;



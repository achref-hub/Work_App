var UserService = require("../services/UserService");
var User = require("../models/User");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt-nodejs");
var async = require("async");
const multer = require("multer");
var fileUpload = require("../helpers/upload-middleware");
var fs = require("fs");
const { ObjectId } = require("mongodb");
var Group = require("../models/Group");



exports.getUsersAdmin = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await UserService.getUsersAdmin({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getUsers = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await UserService.getUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getAllUsers = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await UserService.getAllUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.fetchALLUsers = async function (req, res, next) {
  
  try {
    var data = await UserService.getUser({});
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};




exports.getUsers = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await UserService.getUsers({}, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully Users Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getAccessList = async function (req, res, next) {
  var page = req.params.page ? req.params.page : 1;
  var limit = req.params.limit ? req.params.limit : 10;
  try {
    var data = await UserService.getAccessList({ user: req.user }, page, limit);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully access list Retrieved",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.readController = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.getUserById = async function (req, res, next) {
  try {
    if (req.user.id != req.params.id && !req.user.admin) {
      return res.status(400).json({
        status: 400,
        message: 'Not authorized'
      })
    }
    var content = await UserService.getUserById(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "User Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getUserProfile = async function (req, res, next) {
  try {
    var content = await UserService.getUserProfile(req.params.email);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "User Succesfully found",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};




exports.getNumberofReservations = async function (req, res, next) {
  try {
    var content = await UserService.getNumberOfReservations(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of reservations successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.getNumberofWfh = async function (req, res, next) {
  try {
    var content = await UserService.getNumberOfWFH(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of reservations successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberofCheckins = async function (req, res, next) {
  try {
    var content = await UserService.getNumberOfCheckins(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of checkins successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getNumberofCancellations = async function (req, res, next) {
  try {
    var content = await UserService.getNumberOfCancellations(
      req.params.id,
      req.params.start_date,
      req.params.end_date
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "getting number of cancellations successfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.updateController = (req, res) => {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single("photo");

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    // console.log(user);

    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        if (req.body.newpassword) {
          //console.log(req.body.password);
          if (req.body.newpassword.length < 6) {
            return res.status(400).json({
              error: "Password should be min 6 characters long",
            });
          } else {
            if (!user.authenticate(req.body.oldpassword)) {
              console.log("YOU ARE IN WRONG PASSWORD");
              return res.status(400).json({
                errors: "Old password is incorrect",
              });
            } else {
              console.log("OLD PASSWORD IS", req.body.oldpassword);

              user.password = req.body.newpassword;
            }
          }
        }
        if (req.file) {
          user.photo = req.file.filename;
        }

        user.save((err, updatedUser) => {
          if (err) {
            console.log("USER UPDATE ERROR", err);
            return res.status(400).json({
              error: "User update failed",
            });
          }
          updatedUser.hashed_password = undefined;
          updatedUser.salt = undefined;
          res.json(updatedUser);
        });
      }
    });
  });
};

exports.AdminupdateController = (req, res) => {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single("photo");

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        errors: "User not found",
      });
    }
    // console.log(user);

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        if (req.body.password) {
          //console.log(req.body.password);
          if (req.body.password.length < 6) {
            return res.status(400).json({
              errors: "Password should be min 6 characters long",
            });
          } else {
            if (!user.authenticate(req.body.oldpassword)) {
              console.log("YOU ARE IN WRONG PASSWORD");
              return res.status(400).json({
                errors: "Old password is incorrect",
              });
            } else {
              console.log("OLD PASSWORD IS", req.body.oldpassword);

              user.password = req.body.password;
            }
          }
        }

        if (req.file) {
          user.photo = req.file.filename;
        }

        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }

        if (req.body.email) {
          user.Email = req.body.email;
        }
        if (req.body.role) {
          user.role = req.body.role;
        }
        if (req.body.registrationNumber) {
          user.registrationNumber = req.body.registrationNumber;
        }
        if (req.body.telephone) {
          user.telephone = req.body.telephone;
        }

        if (req.body.spot) {
          user.spot = req.body.spot;
        } else {
          user.set('spot', undefined)
        }
        if (req.body.manager) {
          user.manager = req.body.manager;
        } else {
          user.set('manager', undefined)
        }
        if (req.body.leaveBalance) {
          user.leaveBalance = req.body.leaveBalance;
        }
        if (req.body.isManager == 'true' && req.body.isValidator == 'false') {
          user.role = "manager";
        }

        if (req.body.isValidator == 'true' && req.body.isManager == 'false') {
          user.role = "validator";
        }

        if (req.body.isValidator == 'true' && req.body.isManager == 'true') {
          user.role = "manager_validator";
        }

        if (req.body.isValidator == 'false' && req.body.isManager == 'false') {
          user.role = "user";
        }


        if (req.body.admin) {
          user.admin = req.body.admin
        } else {
          user.set('admin', undefined)
        }

        
        if (req.body.grade) {
          user.grade = req.body.grade;
        }
        if (req.body.serviceLine) {
          user.serviceLine = req.body.serviceLine;
        }

        if (req.body.subserviceLine) {
          user.subServiceLine = req.body.subserviceLine;
        }

          if (req.body.subserviceLine) {
            if (req.body.subserviceLine === "null") {
              var query = {
                Grades: ObjectId(req.body.grade),
                ServiceLine: ObjectId(req.body.serviceLine),
                SubServiceLines: []
              };
            } else {
              var query = {
                Grades: ObjectId(req.body.grade),
                ServiceLine: ObjectId(req.body.serviceLine),
                SubServiceLines: req.body.subserviceLine,
              };
            }
            
          } else {
            var query = {
              Grades: ObjectId(req.body.grade),
              ServiceLine: ObjectId(req.body.serviceLine),
              SubServiceLines: []
            };
          }

 

          var content = await Group.find(query);
          // console.log("content[0]._id",content)
          if (!content || content.length == 0 ) {
            return res.status(400).json({
              errors: "Group with this grade and serviceline does not exist. Please check access",
            });
          }
          user.Group = ObjectId(content[0]._id)
          

        user.save((err, updatedUser) => {
          if (err) {
            
            return res.status(400).json({
              errors: "User update failed",
            });
          }
          updatedUser.hashed_password = undefined;
          updatedUser.salt = undefined;
          res.json(updatedUser);
        });
      }
    });
  });
};

exports.AdminUpdateProfile = (req, res) => {
  var upload = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single("photo");

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        errors: "User not found",
      });
    }
    console.log('user', user);

    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        res.send(err);
      } else if (err) {
        res.send(err);
      } else {
        console.log(req.body)
        if (req.body.password) {
          if (req.body.password.length < 6) {
            return res.status(400).json({
              errors: "Password should be min 6 characters long",
            });
          } else {
            user.password = req.body.password;
          }
        }
      


        if (req.file) {
          user.photo = req.file.filename;
        }

        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }

        if (req.body.email) {
          user.Email = req.body.email;
        }
   
        if (req.body.registrationNumber) {
          user.registrationNumber = req.body.registrationNumber;
        }
        if (req.body.telephone) {
          user.telephone = req.body.telephone;
        }

        user.save((err, updatedUser) => {
          if (err) {
            console.log(err)
            return res.status(400).json({
              errors: "User update failed",
            });
          }
          updatedUser.hashed_password = undefined;
          updatedUser.salt = undefined;
          res.json(updatedUser);
        });
      }
    })
  });
};


exports.updatepassword = async function (req, res, next) {
  try {
    var content = await UserService.NewPassword(
      req.params.id,
      req.body.password,
    );
    return res.status(200).json({
      status: 200,
      data: content,
      message: "newpassword updated succesfully",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.addUser = async function (req, res, next) {
  try {
    User.findOne({ Email: req.body.Email }).then((user) => {
      if (!user) {
        var content = UserService.addUser(req.body);
        return res.status(200).json({
          status: 200,
          message: "User added succesfully",
        });
      } else {
        res.json("User already exist");
      }
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.removeUser = async function (req, res, next) {
  try {
    var content = await UserService.removeUser(req.params.id,);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "User Succesfully deleted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.blockUser = async function (req, res, next) {
  try {
    var content = await UserService.blockUser(req.params.id, req.body.data);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "User Succesfully blocked",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.ModifierImage = (req, res) => {
  try { 
  // console.log(req.body.id)
   var name = req.body.name;
   var img = req.body.image;
   var realFile = Buffer.from(img,"base64");
   fs.writeFile("uploads/"+name, realFile, function(err) {
   //  console.log("hellooo");
       if(err)
          console.log(err);
    });
    User.findOne({ _id: req.body.id }, (err, user) => {
    //  console.log(user);
      user.photo=name
         user.save((err, updatedUser) => {
     if (err) {
       console.log("USER UPDATE ERROR", err);
       return res.status(400).json({
         error: "User update failed",
       });
     }
   });
 });
    res.send("OK"); 
 
   } catch (e) {
     console.log(e)
     return res.status(400).json({
       status: e,
       message: e.message,
     });
   }
 };
 

 exports.deletUserHistory = async function (req, res, next) {
  try {
    var content = await UserService.deletUserHistory();
    return res.status(200).json({
      status: 200,
      data: content,
      message: "History Succesfully deleted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getManagers = async function (req, res) {
  try {
    var content = await UserService.getManagers()
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
    
  }
}

exports.getValidators = async function (req, res) {
  try {
    var content = await UserService.getValidators(req)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
    
  }
}


exports.fetchValidators = async function (req, res) {
  try {
    var content = await UserService.fetchValidators(req)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
    
  }
}






exports.getALLUser = async function (req, res) {
  try {
    var content = await UserService.getALLUser()
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
    
  }
}

exports.getTeamManager = async function (req, res) {
  try {
    var content = await UserService.getTeamManager(req.params.id)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
    
  }
}


exports.setManagersToUsers = async function (req, res) {
  try {
    var content = await UserService.setManagersToUsers(res)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  }
   catch (e) {
     console.log('error', e)
    // return res.status(400).json({
    //   status: 400,
    //   message: e.message,
    // });
    
  }
}


exports.setValidatorsToUsers = async function (req, res) {
  try {
    var content = await UserService.setValidatorsToUsers(res)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  }
   catch (e) {
     console.log('error', e)
    // return res.status(400).json({
    //   status: 400,
    //   message: e.message,
    // });
    
  }
}


exports.addMassIndividualAccesses = async function (req, res) {
  try {
    var content = await UserService.addMassIndividualAccesses(res)
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully ",
    });
  }
   catch (e) {
     console.log('error', e)
    // return res.status(400).json({
    //   status: 400,
    //   message: e.message,
    // });
    
  }
}




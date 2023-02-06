const User = require("../models/User");
const expressJwt = require("express-jwt");
const _ = require("lodash");
const nodemailer = require('nodemailer');
const { ObjectId } = require("mongodb");
var Group = require("../models/Group");
const BalanceService = require('../services/BalanceService')


// const logo = require("../client/src/assets/img/brand/WorkPoint.png")

const fetch = require("node-fetch");

const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const { errorHandler } = require("../helpers/dbErrorHandling");
const multer = require("multer");
var fileUpload = require("../helpers/upload-middleware");

const sgMail = require("@sendgrid/mail");
const { mail_new_user } = require("../template");
const { sendMail } = require("../services/NotificationService");
sgMail.setApiKey(process.env.MAIL_KEY);

exports.registerController = async function (req, res) {  
  const errors = validationResult(req);
  var u = multer({
    storage: fileUpload.files.storage(),
    allowedFile: fileUpload.files.allowedFile,
  }).single("photo");
  u(req, res, async function (err) {
  const Email = req.body.Email;

  if (!errors.isEmpty()) {
    console.log(errors);
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      Email,
    }).exec(async (err, user) => {
      if (user) {
        return res.status(400).json({
          errors: "Email is taken",
        });
      } else {
        console.log("EMAIL NOT TAKEN");
        
          if (err instanceof multer.MulterError) {
            console.log(err);
            res.send(err);
          } else if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log("creating new user now", req.body);

            if (req.body.subServiceLine) {
              if (req.body.subServiceLine === "null") {
                var query = {
                  Grades: ObjectId(req.body.grade),
                  ServiceLine: ObjectId(req.body.serviceLine),
                  SubServiceLines: []
                };
              } else {
                var query = {
                  Grades: ObjectId(req.body.grade),
                  ServiceLine: ObjectId(req.body.serviceLine),
                  SubServiceLines: req.body.subServiceLine,
                };
              }
              
            } else {
              var query = {
                Grades: ObjectId(req.body.grade),
                ServiceLine: ObjectId(req.body.serviceLine),
                SubServiceLines: []
              };
            }
        
          
        
            // console.log("queryyyy", query);
            var content = await Group.find(query);

            if (!content || content.length == 0 ) {
              return res.status(400).json({
                errors: "Group with this grade and serviceline does not exist. Please check access",
              });
            }

            const user = new User({
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              Email: req.body.Email,
              password: req.body.password,
              registrationNumber: req.body.registrationNumber,
              telephone: req.body.telephone,
              grade: req.body.grade,
              serviceLine: req.body.serviceLine,
              subServiceLine: req.body.subServiceLine,
              manager: req.body.manager,
              Group: ObjectId(content[0]._id),
            });

            if (req.body.isManager == 'true' && req.body.isValidator == 'false') {
              user.role = "manager";
            }

            if (req.body.isValidator == 'true' && req.body.isManager == 'false') {
              user.role = "validator";
            }
    
            if (req.body.isValidator == 'true' && req.body.isManager == 'true') {
              user.role = "manager_validator";
            }
            
            if (req.file) {
              user.photo = req.file.filename;
            }

            if (req.body.admin) {
              user.admin = req.body.admin
            }
            
            
            user.save( async (err, user) => {
              if (err) {
                // console.log(err._message);
                console.log("Save error", err);
                return res.status(400).json({
                  errors: err._message,
                });
              } else {

                var text = await mail_new_user(req.body.Email, req.body.password)
                await sendMail(req.body, 'WorkPoint Welcome Message', text)
                var content = await User.find({ Email: req.body.Email})
                var result = await BalanceService.addUserBalance(content[0]._id)

              
                return res.json({
                  success: true,
                  data: user,
                  message: "Signup success",
                });
              }
            });
          }

      }
    });
  }
});
};

exports.signinController = (req, res) => {
  const { Email, password, tokenDevice } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    // check if user exist
    User.findOne({
      Email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User with that email does not exist. Please signup",
        });
      }
       
      
      // authenticate
      if (!user.authenticate(password)) {
          return res.status(400).json({
          errors: "Email and password do not match",
        });
      } 
      if (user && user.isBlocked) { 
          return res.status(400).json({
          errors: "Connection denied ! Your account is disabled",
        });
      }
     
      // generate a token and send to client
      const refreshToken = jwt.sign(        {
        id: user._id,
        firstname:user.firstname,
        lastname:user.lastname,
      }, process.env.JWT_SECRET_REFRESH, {})
      const token = jwt.sign(
        {
          id: user._id,
          role:user.role,
          firstname:user.firstname,
          lastname:user.lastname,
          tokenDevice:req.body.tokenDevice,
          Email:user.Email
        },
        process.env.JWT_SECRET,
        {
          // expiresIn: "12000s",
        }
      );
      const { _id, firstname, lastname, Email, role } = user;      
      User.updateOne
      (
        {
          _id: user._id,      
        },
        { 
          tokenDevice: req.body.tokenDevice 
        }
      )        .then((user) => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return res.json({
          token,
          refreshToken
          // user: {
          //   _id,
          //   firstname,
          //   lastname,
          //   Email,
          //   role,
          //   tokenDevice,
          // },
        });
      })
        .catch((err) => console.log(err));
      // User.findById(_id)
      //   .then((user) => {
      //     req.session.isLoggedIn = true;
      //     req.session.user = user;
      //     console.log(req.session.user._id);
      //     return res.json({
      //       token,
      //       user: {
      //         _id,
      //         firstname,
      //         lastname,
      //         Email,
      //         role,
      //       },
      //     });
      //   })
      //   .catch((err) => console.log(err));
      //console.log(req.session.user);
    });
  }
};

exports.signinUser = (req, res) => {
  const { Email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      Email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User with that email does not exist.",
        });
      }
   
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: "Email and password do not match",
        });
      } 
      if (user && user.isBlocked) { 
        return res.status(400).json({
          errors: "Connection denied ! Your account is disabled",
        });
      }
     
            const token = jwt.sign(
        {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          manager: user.manager,
          isBlocked: user.isBlocked
        },
        process.env.JWT_SECRET,
        {
           expiresIn: "120s",
        }
      );

      const refresh_token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET_REFRESH,
        
      );
     
      
      return res.json({
        token,
        refresh_token
      });
     
    });
  }
};

exports.signinValidator = (req, res) => {
  const { Email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      Email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "Validator with that email does not exist.",
        });
      }
   
      if (!user.authenticate(password)) {
        return res.status(400).json({
          errors: "Email and password do not match",
        });
      } 
      if (user && user.isBlocked) { 
        return res.status(400).json({
          errors: "Connection denied ! Your account is disabled",
        });
      }
     
            const token = jwt.sign(
        {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          manager: user.manager,
          isBlocked: user.isBlocked
        },
        process.env.JWT_SECRET,
        {
           expiresIn: "120s",
        }
      );

      const refresh_token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET_REFRESH,
        
      );
     
      
      return res.json({
        token,
        refresh_token
      });
     
    });
  }
};


exports.refreshToken = async (req, res) => {
  const  refresh_token  = req.body.refreshToken
  if (!refresh_token) {
    res.status(401).json({
      errors: 'Token not found'
    })
  }
  try {
    const verifToken = await jwt.verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH
    )
    const id = verifToken.id
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User not found.",
        });
      }
      const token = jwt.sign(
        {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
          manager: user.manager,
          isBlocked: user.isBlocked
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "120s",
        }
      );

      return res.json({
        token
      });

    })


    
     
  } catch (e) {

    return res.status(400).json({
      errors: e
    })

  }

};



exports.refreshAdminToken = async (req, res) => {
  const  refresh_token  = req.body.refresh_token

  if (!refresh_token) {
    res.status(401).json({
      errors: 'Token not found'
    })
  }

  try {
    const verifToken = await jwt.verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH
    )

    const id = verifToken.id
    User.findById(id).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          errors: "User not found.",
        });
      }


      const token = jwt.sign(
        {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          Email: user.Email,
          admin: user.admin
        },
        process.env.JWT_SECRET,
        {
           expiresIn: "120s",
        }
      );

      return res.json({
        token
      });

    })


    
     
  } catch (e) {

    return res.status(400).json({
      errors: e
    })

  }

};
exports.signinAdmin = (req, res) => {
  const { Email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    // check if user exist
    User.findOne({
      Email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          status: 400,
          message: "User with that email does not exist.",
        });
        // return res.status(400).json({
        //   errors: "User with that email does not exist. Please signup",
        // });
      }
       
      
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).json({
          status: 400,
          message: "Email and password do not match",
        });
        // return res.status(400).json({
        //   errors: "Email and password do not match",
        // });
      } 
      

      if ( user && ['facility', 'talents', 'super'].includes(user.admin) === false) {
        return res.status(400).json({
          status: 400,
          message: "Connection denied ! Your are not authorized to access to this plateform",
        });
        
      }
     
// generate a token and send to client
const token = jwt.sign(
  {
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    Email: user.Email,
    admin: user.admin
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "120s",
  }
);
const { firstname, lastname, Email } = user;

const refresh_token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET_REFRESH,
  
);

return res.json({
  token,
  user: {
    firstname,
    lastname,
    Email,          
  },
  refresh_token
});


});
}
};
// exports.requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   algorithms: ["RS256"], // req.user._id
// });

const config = process.env;


exports.requireSignin = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      errors: "A token is required for authentication",
    });
  }
  else {
    try {
      
      jwt.verify(token, config.JWT_SECRET, (err, decodedToken)=>{
        if (err){
          
          return res.status(401).json("Invalid or expired token");
        }
        else{
          
          req.user = decodedToken
          return next();
        }
      })
  } catch (err) {
    return res.status(401).json({
      errors: err,
    })
  }
}
};

exports.logout = (req, res, next) => {  

  const { token } = req.body;
  refreshTokens = refreshTokens.filter(token => t !== token);

  res.send("Logout successful");
}

exports.adminMiddleware = (req, res, next) => {  
  
  if (!req.user.admin) {
    
    return res.status(400).json({
      errors: "Admin resource. Access denied.",
    }); 

  } 
  next()
 

  };


exports.forgotPasswordController = (req, res) => {
  var VD=req.body.ValidationCoDE
    User.findOne(
      {
        Email:req.body.Email,
      },
      (err, user) => {
        if (err || !user) {
          return res.status(400).json({
            error: "User with that email does not exist",
          });
        }
        else{  
          
          let transporter = nodemailer.createTransport({
          host: 'ssl0.ovh.net',
          port: 465,
          secureConnection: true,
          auth: {
            user: 'support@workpoint.tn',
            pass: 'WorkPoint2021'
          }
        });
        // var transporter = nodemailer.createTransport({
        //   service: 'gmail',
        //   auth: {
        //     user: 'mail@gmail.com',
        //     pass: '*******'
        //   }
        // });
        const message = {
          from: 'support@workpoint.tn', // Sender address
          to: req.body.Email,         // List of recipients
          subject: 'WorkPoint Forgot Password Message', // Subject line
          text: 'Your workpoint account Validation Code is : ' + VD, // Plain text body
          //html: '<b>Hello {{req.body.lastname}}</b><br>',
          html: `<!doctype html>
            <html ⚡4email>
              <head>
                <meta charset="utf-8">
                <style amp4email-boilerplate>body{visibility:hidden}</style>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
              </head>
              <body>
              <br><br><br>
              <center><img width="100px" src="https://workpoint.tn/assets/img/logo.png"></img>
              <br><br>
              <fieldset style=" width: 80%;
                        margin: 20px;
                        padding: 0 10px 10px;
                        border: 2px solid #e8eaed;
                        border-radius: 8px;
                        box-shadow: 0 0 10px #e8eaed;
                        padding-top: 10px;">
                <p><b>Hello ${user.firstname} </b> </p><br>
                
                <p>Your Validation Code  : ${VD}</p>
                
                <p>--------------------------</p>
                <p>Kind regards,</p>
                <p>WorkPoint Team</p>
                
                <a href="www.workpoint.tn">www.workpoint.tn</a>
                
                </fieldset>
                </center>
                
              </body>
            </html>`
        };
        
        
        transporter.sendMail(message, function(err, info) {
          if (err) {
            return res.json({
              message: err,
            });
          } else {
            return res.json({
              message: user,          });
          }
        });
        
        
        // return User.updateOne(
        //   {
        //     Email: req.body.Email,
        
        //   },
        //   {
        //     ValidationCode: VD.toString(),
        //   },
        //   (err, success) => {
        //     if (err) {
        //       console.log("RESET PASSWORD LINK ERROR", err);
        //       return res.status(400).json({
        //         error:
        //           "Database connection error on user password forgot request",
        //       });
        //     } if(success) {
        //       transporter.sendMail(message, function(err, info) {
        //         if (err) {
        //           return res.json({
        //             message: err,
        //           });
        //         } else {
        //           return res.json({
        //             message: `Email has been sent to ${email}. Follow the instruction to activate your account`,          });
        //         }
        //     });
        //     }
        //     else{
        //       return res.json({
        //         message: `mamchetech`,          });
        
        //     }
        //   }
        // );
        }

     
      }
    );
 
};

// exports.resetPasswordController = (req, res) => {
//   const { resetPasswordLink, newPassword } = req.body;

//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const firstError = errors.array().map((error) => error.msg)[0];
//     return res.status(422).json({
//       errors: firstError,
//     });
//   } else {
//     if (resetPasswordLink) {
//       jwt.verify(
//         resetPasswordLink,
//         process.env.JWT_RESET_PASSWORD,
//         function (err, decoded) {
//           if (err) {
//             return res.status(400).json({
//               error: "Expired link. Try again",
//             });
//           }

//           User.findOne(
//             {
//               resetPasswordLink,
//             },
//             (err, user) => {
//               if (err || !user) {
//                 return res.status(400).json({
//                   error: "Something went wrong. Try later",
//                 });
//               }

//               const updatedFields = {
//                 password: newPassword,
//                 resetPasswordLink: "",
//               };

//               user = _.extend(user, updatedFields);

//               user.save((err, result) => {
//                 if (err) {
//                   return res.status(400).json({
//                     error: "Error resetting user password",
//                   });
//                 }
//                 res.json({
//                   message: `Great! Now you can login with your new password`,
//                 });
//               });
//             }
//           );
//         }
//       );
//     }
//   }
// };

exports.Logout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
};

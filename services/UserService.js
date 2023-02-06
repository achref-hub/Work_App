var User = require("../models/User");
var History = require("../models/History");
const { ObjectId } = require("mongodb");
const UserService = require("./UserService")
const cron = require("node-cron");
const Desk = require("../models/Desk");
const Operation = require("../models/Operation");
const { Encrypt, Decrypt } = require("./Crypto");
const UsersManager = require("../models/UsersManager");
const IndividualAccess = require("../models/IndividualAccess");

const { validationResult } = require("express-validator");
const IndividualAccessService = require("./IndividualAccessService")

// const io = socket.getSocketIo()
exports.getUsers = async function (query, page, limit) {
  try {
    
    var users = await User.find().select({ "firstname": 1, "_id": 1, "lastname": 1, "Accesses" :0})
    return users;
  } catch (e) {
    throw Error("Error while Paginating users");
  }
};

exports.getAllUsers = async function (query, page, limit) {
  try {
    
    var user = await User.find().select({ "firstname": 1, "_id": 1, "lastname": 1, "Accesses" :0})
    var users = Encrypt(user)
    return users;
  } catch (e) {
    throw Error("Error while Paginating users");
  }
};

exports.getUsersAdmin = async function (query, page, limit) {
  try {
    
    var user = await User.find().select({ "firstname": 1, "_id": 1, "lastname": 1, "Email": 1, "registrationNumber":1
    , "grade": 1, "serviceLine":1, "subServiceLine": 1, "Accesses" :0}).populate({path:'grade', select: { 'grade_name': 1, '_id': 1 }}).populate({path: 'serviceLine', select: { '_id': 1, 'serviceLine':1}})
    var users = Encrypt(user)
    return users;
  } catch (e) {
    throw Error("Error while Paginating users");
  }
};



exports.getAccessList = async function (query, page, limit) {
  try {
    var user = await User.findById(query);
    return user.Accesses;
  } catch (e) {
    throw Error("Error while Paginating Access List for this user");
  }
};

//Amira : check impacts on grades, service lines, subservicelines
exports.addUser = async function (document) {
  try {
    var content = await User.create(document);
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while creating new User");
  }
};

exports.getUserById = async function (id) {
  try {
    var user = await User.findById(id).select({'firstname': 1, 'lastname': 1, 'grade': 1, 'serviceLine': 1, 'spot': 1, 'manager': 1, 'photo':1, '_id':1, 'role': 1, 'registrationNumber': 1, 'subServiceLine': 1, 'Email':1, 'telephone': 1, 'admin': 1})
    .populate({ path: 'grade', select:{ 'grade_name': 1, '_id': 1} })
    .populate({ path: 'serviceLine', select:{ 'serviceLine': 1, '_id': 1} })
    .populate({ path: 'spot', select:{ 'name': 1, '_id': 1, 'zone':1} })
    .populate({ path: 'manager', select:{ 'firstname': 1, '_id': 1, 'lastname': 1 } })
    return user;
  } catch (e) {
    throw Error("Error while finding this user");
  }
};

exports.updateUser = async function (id, data) {
  try {
    console.log("update User")
    var content = await User.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error("Error while updating the user");
  }
};
//change to archive user and check impacts on grade, sl, ssl, reservations, accesses...
exports.removeUser = async function (id) {
  try {
    var content = await User.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting the user");
  }
};



exports.getNumberOfCheckins = async function (id, start_date, end_date) {
  try {
    var history = await History.find({
      createdAt: {
        $gte: start_date,
        $lt: end_date,
      },
      user: ObjectId(id),
      TransactionType: "CHECKIN",
    });
    console.log(history.length);
    return history.length;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of check ins", e);
  }
};

exports.getNumberOfCancellations = async function (id, start_date, end_date) {
  try {
    var history = await History.find({
      createdAt: {
        $gte: start_date,
        $lt: end_date,
      },
      user: ObjectId(id),
      TransactionType: "CANCELLATION",
    });
    console.log(history.length);
    return history.length;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of cancellations", e);
  }
};

//get by name



exports.blockUser = async function (id, data) {
  try {
    var content = await User.findByIdAndUpdate(id, data);
    content.save();
    return content;
  } catch (e) {
    throw Error("Error while updating");
  }
};
exports.NewPassword = async function (id, password) {
  try {

    User.findOne({ _id: id }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
    user.password = password;
    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(400).json({
          error: "User update failed",
        });
      }
      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;
   return user ;
    });
  });
  } catch (e) {
    throw Error(e);
  }
};


exports.deletUserHistory = async function () {
  
  try {
    var today = new Date()
    var lastWeek = today
    lastWeek.setDate(today.getDate()-5)
    // const users = await User.find({_id : ObjectId("615327e5da9c586d5f4c3b8a")})
    const users = await User.find()
    
    for (user of users) {
      user.history = await user.history.filter(item => (item.createdAt.toISOString().substring(0,10) >= lastWeek.toISOString().substring(0,10) ))
      var u = await UserService.updateUser(user._id, user)

    }
    
  } catch (e) {
    console.log(e)
    throw Error(e)
  }
}


// cron.schedule("10 03 * * *",async function(){
//   try{  
    
//   await UserService.deletUserHistory();
  
  
//   } catch (e) {
//     console.log(e);
//     throw Error("error while deleting users history", e);
//   }
//   });

exports.getManagers = async function () {

  try {
    var user = await User.find({role:  {$in: ['validator', 'manager_validator']}}).select({ "firstname": 1, "_id": 1, "lastname": 1, "photo": 1});
    var managers = Encrypt(user)
    return managers;
  } catch (e) {
    throw Error("Error while finding this user");
  }
};

exports.getValidators = async function (req) {
  try {
    var user = await User.find({role:  {$in: ['validator', 'manager_validator']}}).select({ "firstname": 1, "_id": 1, "lastname": 1, "photo": 1});
    return user;
  } catch (e) {
    throw Error("Error while finding validators");
  }
};

exports.fetchValidators = async function (req) {
  try {

    
        var user = await User.find({role:  {$in: ['validator', 'manager_validator']}}).select({ "firstname": 1, "_id": 1, "lastname": 1, "photo": 1});
  
        var data = Encrypt(user)
       
        return data;
  } catch (e) {
    console.log(e)
    throw Error("Error while finding validators");
  }
};





exports.getALLUser = async function () {
  try {
    var users = []
    var content = await User.find().select({ "firstname": 1, "lastname": 1, "Email": 1, 'registrationNumber': 1, 'telephone': 1, 
    'grade': 1, 'serviceLine': 1, 'subServiceLine': 1, 'Accesses': 0, '_id': 0 }).populate('grade').populate('serviceLine')
    await content.map( item => {
      users.push({
        'User' : item.firstname + ' ' + item.lastname,
        'Email': item.Email,
        'Registration Number': item.registrationNumber,
        'Telephone': item.telephone,
        'Grade':  item.grade && item.grade.grade_name,
        'SL': item.serviceLine && item.serviceLine.serviceLine,
        'SSL': item.subServiceLine,
        
      })
    })
    return users;
  } catch (e) {
    console.log(e)
    throw Error("Error while finding this user");
  }
};

exports.getALLRessources = async function () {
  try {
    var users = []
    var content = await Desk.find().select({ "name": 1, "zone": 1, 'reservations': 0, '_id': 0 }).populate('zone')
    await content.map( item => {
      users.push({
        'Ressource' : item.name,
        'Zone': item.zone && item.zone.name,
        
        
      })
    })
    return users;
  } catch (e) {
    console.log(e)
    throw Error("Error while finding this user");
  }
};


exports.getTeamManager = async function (id) {
  try {
    var content = await User.find({ manager: id}).select({ "firstname": 1, "_id": 1, "lastname": 1, "photo": 1});
    return content;
  } catch (e) {
    console.log(e)
    throw Error("Error while finding this user");
  }
};


exports.getNumberOfWFH = async function (id, start_date, end_date) {
  try {
    var operations = await Operation.find({
      OperationType: 'WFH',
      date: {
        $gte: start_date,
        $lt: end_date,  
      },
      user: ObjectId(id),
    }).populate({
      path: 'request',
      match: { status:  {$in: ['accepted', 'pending']}}
    })
    const result = operations.filter(item => item.request != null)
    return result.length/2;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of wfh", e);
  }
};

exports.getNumberOfReservations = async function (id, start_date, end_date) {
  try {
    var reservations = await Operation.find({
      OperationType: 'RESERVATION',
      reservationdate: {
        $gte: start_date,
        $lt: end_date,  
      },
      user: ObjectId(id),
    });
    return reservations.length/2;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
};


exports.setManagersToUsers = async function (res) {
    // var content = await UsersManager.create({
    //   "First_name": "Rawen",
    //   "Last_name": "Mersani"
    // });
    var usersNotFound = []
    var content = await UsersManager.find()
    for ( const item of content) {
      // const user = await User.findOne({registrationNumber: item.Registration_number})
      // console.log(item)
      const manager = await User.findOne({registrationNumber: item.Manager_GPN})
      console.log(manager._id)
      const userManager = await User.findOne({ registrationNumber: item.Registration_number }, (err, user) => {
        if (err || !user) {
          console.log("item.Registration_number", item.Registration_number)
          usersNotFound.push(item)
          
          // return res.status(400).json({
          //   errors: "User not found",
          // });
          
        } else {
          user.manager = manager._id;
          user.role = item.Role;
          user.save((error, updatedUser) => {
            if (error) {
              console.log("error", error);
              return res.status(400).json({
                errors: "User update failed",
              });
            }
          return user ;
        });
        }
        
        
    });

    }

    console.log('usersNotFound', usersNotFound)
    return usersNotFound;

  // } catch (e) {
  //   console.log(e)
  //   throw Error("Error");
  // }
};

exports.getUserProfile = async function ( email ) {
  try {
    var user = await User.findOne({Email: email}).populate('serviceLine').populate('grade')
    return user
  } catch (e) {
    throw Error(e)
  }
}


exports.setValidatorsToUsers = async function (res) {
  // var content = await UsersManager.create({
  //   "First_name": "Rawen",
  //   "Last_name": "Mersani"
  // });
  // var usersNotFound = []
  // var content = await UsersManager.find()
  // for ( const item of content) {
  //   // const user = await User.findOne({registrationNumber: item.Registration_number})
  //   // console.log(item)
  //   const manager = await User.findOne({registrationNumber: item.Manager_GPN})
  //   console.log(manager._id)
  //   const userManager = await User.findOne({ registrationNumber: item.Registration_number }, (err, user) => {
  //     if (err || !user) {
  //       console.log("item.Registration_number", item.Registration_number)
  //       usersNotFound.push(item)
        
  //       // return res.status(400).json({
  //       //   errors: "User not found",
  //       // });
        
  //     } else {
  //       user.manager = manager._id;
  //       user.role = item.Role;
  //       user.save((error, updatedUser) => {
  //         if (error) {
  //           console.log("error", error);
  //           return res.status(400).json({
  //             errors: "User update failed",
  //           });
  //         }
  //       return user ;
  //     });
  //     }
      
      
  // });

  // }

  // console.log('usersNotFound', usersNotFound)
  // return usersNotFound;

// } catch (e) {
//   console.log(e)
//   throw Error("Error");
// }
};

exports.addMassIndividualAccesses = async function (res) {
  
  const gradeId = '615252b33e371a1a2bcd545e'
  var usersNotFound = []
  var users = await User.find({grade : ObjectId(gradeId) }).select({ "_id": 1});
  
  //console.log(users)

  for ( const user of users) {
    

    const content = {
      User: user._id,
      Zones : ["608f9a8114cf67da43ee68e7", "608f9a9b14cf67da43ee68e9"]
     }

    console.log(content)

    var result = await IndividualAccessService.addAccessToUser(content);

  
    
    };

    return result 
    
};





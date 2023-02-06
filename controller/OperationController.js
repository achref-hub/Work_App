const Operation = require("../models/Operation");
var OperationService = require("../services/OperationService");


exports.addOperation = async function (req, res, next) {
   
    try {
      var data = await OperationService.addOperation( req.body);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Request added Succesfully",
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };
  

  exports.deleteOperation = async function (req, res, next) {
   
    try {
      var operation = await Operation.findById(req.params.id)
      if (operation.user != req.user.id) {
        return res.status(400).json({
          status: 400,
          message: 'Not authorized'
        })
      }
      var data = await OperationService.deleteOperation( req.params.id, req.user, res);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Operation deleted Succesfully",
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };

exports.getOperationsByRequest = async function (req, res, next) {
   
    try {
      var data = await OperationService.getOperationsByRequest( req.params.id, req.user, res);
      return res.status(200).json({
        status: 200,
        data: data,
        message: "Operations finded Succesfully",
      });
    } catch (e) {
      console.log(e)
      return res.status(400).json({
        status: 400,
        message: e.message,
      });
    }
  };

  
exports.getLeaveByOperation = async function (req, res) {
   
  try {
    var data = await OperationService.getLeaveById( req.params.id, res);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Operations finded Succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.updateLeave = async function (req, res) {
  try {
    var content = await OperationService.updateLeave(req.params.id, req.body);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully updated",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

  

  
exports.getOperationsByUser = async function (req, res, next) {
   
  try {
    if (req.params.id != req.user.id) {
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
    }
    var data = await OperationService.getOperationsByUser(req.params.id);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Operations finded Succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getLeaveBySlot = async function(req,res){
  try{
    var getLeaves = await OperationService.getLeaveBySlot(req.body);
    console.log(getLeaves,"getLeaves");
    return res.status(200).json({
      status: 200,
      data: getLeaves,
      message: 'Slot getted Succesfully',
    });

  }catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.removeLeave = async function (req, res, next) {
  try {
    var content = await OperationService.removeLeave(req.params.id);
    return res.status(200).json({
      status: 200,
      data: content,
      message: "Succesfully deleted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.getOperationsByManager = async function (req, res, next) {
   
  try {
    if (req.params.id != req.user.id) {
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
    }
    var data = await OperationService.getOperationsByManager(req.params.id);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Operations finded Succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.addNewLeave =async function (req ,res, next){
try{
  var data = await OperationService.addLeave(req.body,res);
  console.log('data leave' , data );
  return res.status(200).json({
    status :200 ,
    data :data,
    message : "Leave added Succesfully"
  })

}catch(e){
  console.log(e);
  return res.status(400).json({
    status: 400,
    message: e.message,
  });
}
};
exports.addNewReservation = async function (req, res, next) {
   
  try {
    var data = await OperationService.addReservation(req.body, res);
    console.log('data controller', data)
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Reservation added Succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.checkReservation = async function (req, res, next) {
     
  try {
    var data = await OperationService.checkReservation(req.params.user,req.params.reservationdate,req.params.timeslot,req.params.resource);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Succesfully checkReservation",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.addNewReservations = async function (req, res, next) {
   
  try {
    var data = await OperationService.addReservations(req.body, res);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Reservations added Succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.ScanQR = async function (req, res, next) {
   
  try {
    var data = await OperationService.ScanQR(req.params.user,req.params.QRcode);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Reservations added Succesfully",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getAllOperations = async function (req, res, next) {
  try {
    
    if (req.user.role ==  'validator' || req.user.role == 'manager_validator' || req.user.admin) {
      var data = await OperationService.getAllOperations(req.body.users, req.user);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Operations getted successfully",
    });
  } else {
    return res.status(400).json({
      status: 400,
      message: 'Not authorized',
    });
  }

  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};


exports.checkInParking = async function (req, res, next) {
  try {
    var data = await OperationService.checkInParking(req.body);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "Checkin success",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.freeParking = async function (req, res, next) {
  try {
    var data = await OperationService.freeParking(req.body);
    return res.status(200).json({
      status: 200,
      data: data,
      message: "success",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};



exports.checkoutParking = async function (req, res, next) {
  try {
    var data = await OperationService.checkoutParking(req.params.id);
    return res.status(200).json({
      status: 200,
      message: "success",
    });
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

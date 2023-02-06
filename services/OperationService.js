const Operation = require('../models/Operation');
const userService = require('./UserService');
const Request = require('../models/Request');
const Reservation = require('../models/Reservation');

const Balance = require('../models/Balance');
const DeskService = require('./DeskService');
const availabilityService = require('./AvailabilityService');
const RequestService = require('./RequestService');

const HistoryService = require('./HistoryService');
const ReservationService = require('./ReservationService');
const OperationService = require('./OperationService');
const UserService = require('./UserService');
const axios = require('axios');
const NotificationService = require('./NotificationService');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const BalanceService = require ('../services/BalanceService')
const cron = require("node-cron");
const moment = require('moment')
const { ObjectId } = require('mongodb');
const {
  mail_cancellation_operation,
  mail_cancellation_operation_REMOTE,
} = require('../template');
const Parking = require('../models/Parking');
const ParkingService = require('./ParkingService')


exports.getOperationsByRequest = async function (id, user, res) {
  try {
     var request = await Request.findById(id)
   
    if (request.idSender == user.id || request.idReciever == user.id || user.admin ) {
      var content = await Operation.find({
        request: id,
      });
     } else {
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
     }

    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};
exports.getOperationsByManager = async function (id) {
  try {
    var content = await Operation.find({ manager: id })
      .populate({
        path: 'request',
        match: { status: { $in: ['accepted', 'pending'] } },
      })
      .populate({
        path: 'desk',
        populate: {
          path: 'zone',
          populate: {
            path: 'floor',
          },
        },
      });
    const result = content.filter(
      (item) => item.request != null || item.OperationType == 'RESERVATION',
    );
    return result;
  } catch (e) {
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};


exports.getOperationsByUser = async function (id) {
  try {
    var content = await Operation.find({
      user: id,
    })
      .populate({
        path: 'request',
        match: { status: { $in: ['accepted', 'pending'] } },
        populate: {
          path: 'idReciever',
          select: { firstname: 1, lastname: 1, photo: 1, Accesses: 0 },
        },
      })
      .populate({
        path: 'desk',
        populate: {
          path: 'zone',
          populate: {
            path: 'floor',
          },
        },
      });
    const result = content.filter(
      (item) => item.request != null || item.OperationType == 'RESERVATION',
    );
    return result;
  } catch (e) {
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};
exports.getLeaveBySlot = async function(){
  try{
    var content = await Operation.find({
      type :  "Leaves" ,
    });
    return content;
  } catch(e){
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};

exports.updateLeave =async function(id , data){
  try{
    var content = await Operation.findByIdAndUpdate(id , data);
    // console.log(data,"data");
    return content;
  }catch(e){
    throw Error("Error while updating Leave");
  }
}

exports.getLeaveById = async function (id){
  try{
    var content = await Operation.findOne({
      _id : id,
    });
    return content;
  } catch(e){
    console.log(e);
    throw Error('Error while finding Leaves ');
  }
};

exports.getOperationsByUserDate = async function (id, date, slot) {
  try {
    var content = await Operation.find({
      user: id,
      date: date,
      timeslot: slot,
    }).populate({
      path: 'request',
      match: { status: { $in: ['accepted', 'pending'] } },
    });
    var result = content.filter((item) => item.request != null);
    return result;
  } catch (e) {
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};

exports.getReservationsByUserDate = async function (id, date, slot) {
  try {
    var content = await Operation.find({
      user: id,
      reservationdate: date,
      timeslot: slot,
    }).populate('request');

    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};


exports.addOperation = async function (document) {
  try {
    var content = await Operation.create(document);

    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while creating new Operation');
  }
};

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

exports.deleteOperation = async function (id, user, res, isRequest, systemOp) {
  try {
    var content = await Operation.findById(id)
      .populate({
        path: 'request',
        populate: {
          path: 'idReciever',
        },
      })
      .populate('user');

    if (content.OperationType === 'WFH') {
      if (isRequest != false) {
        if (systemOp == true ) {
          history = await HistoryService.addNewHistory({
            WFH_Operation: {
              status: 'CANCELLED',
              Request: content.request._id,
              idReciever: content.request.idReciever._id,
              timeslot: content.timeslot,
              date: content.date,
            },
            user: content.request.idSender,
            TransactionType: 'WFH_CANCELLATION',
            isSystemOp: true
          });

        } else {
          history = await HistoryService.addNewHistory({
            WFH_Operation: {
              status: 'CANCELLED',
              Request: content.request._id,
              idReciever: content.request.idReciever._id,
              timeslot: content.timeslot,
              date: content.date,
            },
            user: content.request.idSender,
            TransactionType: 'WFH_CANCELLATION',
          });
        }
     
      }
      var operations = await OperationService.getOperationsByRequest(content.request._id, user, res);
      if (operations.length <= 1) {
        var result = await Request.findByIdAndDelete(content.request._id);
      }
      var balance = await Balance.findOne({ idUser: content.request.idSender });
      var WFHmonthBalance = balance.WFHmonthBalance;
      var WFHweekBalance = balance.WFHweekBalance;
      const date = new Date(content.date);
      const month = date.getMonth() + 1;
      var j = WFHmonthBalance.findIndex((x) => x.nb == month);
        WFHmonthBalance[j].count = WFHmonthBalance[j].count - 0.5;
      
      var nb = getWeekNumber(date);
      var i = WFHweekBalance.findIndex((x) => x.nb == nb);
        WFHweekBalance[i].count = WFHweekBalance[i].count - 0.5;
      
        var result = await BalanceService.updateBalance(balance._id, { WFHmonthBalance: WFHmonthBalance,  WFHweekBalance: WFHweekBalance })
      var text = await mail_cancellation_operation(
        content.user,
        content.date,
        content.timeslot,
      );

      await NotificationService.sendMail(
        content.request.idReciever,
        'Work from home request',
        text,
      );
      const notif_message = `Hi ${content.request.idReciever.firstname}, ${content.user.firstname} ${content.user.lastname} has cancelled a WFH slot.`;
      await NotificationService.sendNotif(
        'WFH slot cancellation',
        notif_message,
        content.request.idReciever.tokenDevice,
        'team',
      );
    } else if (content.OperationType === 'REMOTE_WORKING') {
      if (isRequest != false) {
        if (systemOp == true) {
          history = await HistoryService.addNewHistory({
            WFH_Operation: {
              status: 'CANCELLED',
              Request: content.request._id,
              idReciever: content.request.idReciever._id,
              date: content.date_debut,
            },
            user: content.request.idSender,
            TransactionType: 'WFH_CANCELLATION',
            isSystemOp: true,
          });
        } else {
          history = await HistoryService.addNewHistory({
            WFH_Operation: {
              status: 'CANCELLED',
              Request: content.request._id,
              idReciever: content.request.idReciever._id,
              date: content.date_debut,
            },
            user: content.request.idSender,
            TransactionType: 'WFH_CANCELLATION',
          });
        }
      }
      var operations = await OperationService.getOperationsByRequest(
        content.request._id, user, res
      );
      var result = await Request.findByIdAndDelete(content.request._id);

      var text = await mail_cancellation_operation_REMOTE(
        content.user,
        content.date_debut,
        content.date_fin,
      );

      await NotificationService.sendMail(
        content.request.idReciever,
        'Remote Working request',
        text,
      );
      const notif_message = `Hi ${content.request.idReciever.firstname}, ${content.user.firstname} ${content.user.lastname} has cancelled a Remote Working.`;
      await NotificationService.sendNotif(
        'Remote Working cancellation',
        notif_message,
        content.request.idReciever.tokenDevice,
        'team',
      );          
    } else {
      var reservation = await Operation.findById(id);
      history = await HistoryService.addNewHistory({
        Reservation: {
          status: 'CANCELLED',
          timeslot: reservation.timeslot,
          desk: reservation.desk,
          reservationdate: reservation.reservationdate,
        },
        TransactionType: 'CANCELLATION',
        user: reservation.user,
      });
      var reservationdate = content.reservationdate
        .toISOString()
        .substring(0, 10);
      desk = await DeskService.getDeskByid(content.desk);
      var status = 'AVAILABLE';
      var m = await availabilityService.updateavailabilityDesk(
        reservationdate,
        desk.zone.toString(),
        content.timeslot.toString(),
        '',
        content.desk.toString(),
        status,
      );
      // await Reservation.findByIdAndDelete(id);
      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
      if (desk.name.charAt(0) === '-') {
        var querytest = { id_reservation: id };
        const data = await Parking.find(querytest);
        await axios.post(`${process.env.SERVER_PARKING}/deleteParkingAccess/`,
          { 
            "access": data[0].access,
          }).then(async (response)=> {
            if ( response.status == 200 ) {
              await Parking.findByIdAndDelete(data[0].id);
            }
          }).catch(e => {
            console.log(e)
          })
        
        
      }
    }
    var content = await Operation.findByIdAndDelete(id);
    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while deleting Operation');
  }
};
const addFunction = async (document, access, idUser, user, desk) => {

  var content = await Operation.create({
      status: "ACTIVE",
      timeslot: document.timeslot,
      user: document.user,
      desk: document.desk,
      reservationdate: document.reservationdate,
      OperationType: "RESERVATION",
      manager: user.manager
    });
    var reservationdate= document.reservationdate.substring(0,10);

    var status = "BOOKED";
   var m = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone,document.timeslot,document.user,document.desk,status);
   
   history = await HistoryService.addNewHistory({
      Reservation: {
        status: "ACTIVE",
        timeslot: document.timeslot,
        desk: document.desk,
        user: document.user,
        reservationdate: document.reservationdate,
      },
      TransactionType: "RESERVATION",
      user: document.user,
    });

    var add_parking = await Parking.create({
      date: document.reservationdate,
      id_reservation: content._id,
      user : {
        id: user._id,
        id_user_Til: idUser,
        firstname: user.firstname,
        lastname: user.lastname,
        matricule : user.registrationNumber
      },
      access: access,
      timeslot: document.timeslot,
      id_spot: document.desk,
      status: "ACTIVE",
    });

    return 200;

}
exports.addLeave =async function(document,res){
  try{
    var add_Leave = await Operation.create (document);
    return console.log(add_Leave,'add_Leave');
    

  } 

  catch (e) {
    console.log(e);
    throw Error(e);

  }
}

exports.addReservation = async function (document,res) {
  try {     
    var reservationsActive = {
      user: ObjectId(document.user),
      reservationdate: document.reservationdate,
      timeslot: document.timeslot.toUpperCase(),
      status: 'AVAILABLE',
    };
    var reservationsEnded = {
      user: ObjectId(document.user),
      reservationdate: document.reservationdate,
      timeslot: document.timeslot.toUpperCase(),
      status: 'ENDED',
    };
    var requests = {
      user: ObjectId(document.user),
      date: document.reservationdate,
      timeslot: document.timeslot.toUpperCase(),
    };
    var reservationData = await Operation.find({
      $or: [reservationsActive, reservationsEnded],
    }).populate('desk');
    var result = await Operation.find(requests).populate({
      path: 'request',
      match: { status: { $in: ['accepted', 'pending'] } },
    });
    var periodestart = await Operation.find({
      OperationType: 'REMOTE_WORKING',
      user: document.user,
      date_debut: { $lte: new Date(document.reservationdate) },
    });
    var periodeEnd = await Operation.find({
      OperationType: 'REMOTE_WORKING',
      user: document.user,
      date_fin: { $gte: new Date(document.reservationdate) },
    });
    console.log('periodestart', periodestart);
    console.log('periodeEnd', periodeEnd);

    if (periodestart.length !== 0 && periodeEnd.length !== 0) {
      return {
        status: 201,
        message: 'You already have an remote working during this period',
      };
    }
    var requestData = result.filter((item) => item.request != null);
     
    if (requestData.length == 1) {
      return {
        status: 201,
        message:
          'You have already a WFH request in ' +
          document.reservationdate.split('-').reverse().join('-') +
          ' ' +
          document.timeslot.toUpperCase(),
      };
    } else if (reservationData.length == 1) {
      var resourceReserved = reservationData[0].desk;
       
      var resourceToReserve = await DeskService.getDeskByid(document.desk);
       
      if (
        resourceToReserve.name.charAt(0) === '-' &&
        resourceReserved.name.charAt(0) === '-'
      ) {
        // return 201;
        return {
          status: 201,
          message:
            'You have already a parking reservation in ' +
            document.reservationdate.split('-').reverse().join('-') +
            ' ' +
            document.timeslot.toUpperCase(),
        };
      } else if (
        resourceToReserve.name.charAt(0) !== '-' &&
        resourceReserved.name.charAt(0) !== '-'
      ) {
        // return 201;
        return {
          status: 201,
          message:
            'You have already a desk reservation in ' +
            document.reservationdate.split('-').reverse().join('-') +
            ' ' +
            document.timeslot.toUpperCase(),
        };
      }
    } else if (reservationData.length == 2) {
      // return 201;
      return {
        status: 201,
        message:
          'You have already a reservations in ' +
          document.reservationdate.split('-').reverse().join('-') +
          ' ' +
          document.timeslot.toUpperCase(),
      };
    }
    var desktest = {
      reservationdate: document.reservationdate,
      desk: document.desk,
      timeslot: document.timeslot.toUpperCase(),
    };
    var d = await Operation.find(desktest);
    if (d.length != 0) {
      // return 300;
      return {
        status: 201,
        message:
          'This desk is booked in ' +
          document.reservationdate.split('-').reverse().join('-') +
          ' ' +
          document.timeslot.toUpperCase(),
      };
    } else {
      var resourceToReserve = await DeskService.getDeskByid(document.desk)
      if (resourceToReserve.name.charAt(0) === "-" ) {
        var reservationDate = new Date(document.reservationdate);
        var Now = new Date();
        var DateNow=new Date();
        console.log("reservationDate",reservationDate.getTime())
        console.log("Now",Now.getTime())

        if (reservationDate.toISOString().substring(0,10) != Now.toISOString().substring(0,10))
{
  return   {
      status: 201,
      message:
      "the date you have chosen isn't available"
      };
   
} else {
       process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

       var user = await User.findById(document.user)
       console.log("registrationNumber",user);

       const result = await axios.post(`${process.env.SERVER_PARKING}/addParkingAccess/`,
         { 
         "registrationNumber": user.registrationNumber,
         "timeslot": document.timeslot,
         "reservationdate": document.reservationdate
         }).then(async (response)=> {

             console.log('Hello there ! ', response)
             if ( response.data.status == 200  ) {
               access = response.data.data.access
               id = response.data.data.id
               const result = await addFunction(document,access, id, user, resourceToReserve)
               return 200
              //  return  res.status(200).json({
              //   status: 200,
              //   data:  200,
              //   message: "Reservation added Succesfully",
              // }); 
             } else {
               response.data.error ? console.log(response.error) : console.log(response)
               return  res.status(200).json({
                status: 200,
                data:  {
                  status: 201,
                  message:
                  "Ooops! Something Went Wrong!"
                                },
                message: "Error",
              });               }
         }).catch(e => {

          console.log(e)
          return  res.status(200).json({
            status: 200,
            data:  {
              status: 201,
              message:
                'Error connection'
            },
            message: "Error",
          });      
         })
         return result
      }} else {
      var user = await User.findOne({ _id: document.user });
      var content = await Operation.create({
        status: 'ACTIVE',
        timeslot: document.timeslot,
        user: document.user,
        manager: user.manager,
        desk: document.desk,
        reservationdate: document.reservationdate,
        OperationType: 'RESERVATION',
      });
       
      var reservationdate = document.reservationdate.substring(0, 10);
      // userData = await UserService.getUserById(document.user);
      desk = await DeskService.getDeskByid(document.desk);
       
      var status = 'BOOKED';
      var m = await availabilityService.updateavailabilityDesk(
        reservationdate,
        desk.zone,
        document.timeslot,
        document.user,
        document.desk,
        status,
      );

      history = await HistoryService.addNewHistory({
        Reservation: {
          status: 'ACTIVE',
          timeslot: document.timeslot,
          desk: document.desk,
          user: document.user,
          reservationdate: document.reservationdate,
        },
        TransactionType: 'RESERVATION',
        user: document.user,
      });
      return 200;
    }
    }
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};
exports.removeLeave = async function (id) {
  try {
    var content = await Operation.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting Leave");
  }
};

exports.addReservations = async function (document, res) {
  try {
    //  console.log("document",document);

    var reservationAMActive = {
      user: ObjectId(document[0].user),
      reservationdate: document[0].reservationdate,
      timeslot: document[0].timeslot.toUpperCase(),
      status: 'ACTIVE',
    };
    var reservationAMEnded = {
      user: ObjectId(document[0].user),
      reservationdate: document[0].reservationdate,
      timeslot: document[0].timeslot.toUpperCase(),
      status: 'ENDED',
    };

    var requestsAM = {
      user: ObjectId(document[0].user),
      date: document[0].reservationdate,
      timeslot: document[0].timeslot.toUpperCase(),
    };
    var reservationDataAM = await Operation.find({
      $or: [reservationAMActive, reservationAMEnded],
    }).populate('desk');
    var result = await Operation.find(requestsAM).populate({
      path: 'request',
      match: { status: { $in: ['accepted', 'pending'] } },
    });

    var requestDataAM = result.filter((item) => item.request != null);
    var periodestart = await Operation.find({
      OperationType: 'REMOTE_WORKING',
      user: document[0].user,
      date_debut: { $lte: new Date(document[0].reservationdate) },
    });
    var periodeEnd = await Operation.find({
      OperationType: 'REMOTE_WORKING',
      user: document[0].user,
      date_fin: { $gte: new Date(document[0].reservationdate) },
    });

    if (periodestart.length !== 0 && periodeEnd.length !== 0) {
      return {
        status: 201,
        message: 'You already have an remote working during this period',
      };
    }

    ///////////////////////////////////////////
    var reservationPMACTIVE = {
      user: ObjectId(document[1].user),
      reservationdate: document[1].reservationdate,
      timeslot: document[1].timeslot.toUpperCase(),
      status: 'ACTIVE',
    };
    var reservationPMENDED = {
      user: ObjectId(document[1].user),
      reservationdate: document[1].reservationdate,
      timeslot: document[1].timeslot.toUpperCase(),
      status: 'ENDED',
    };
    var requestsPM = {
      user: ObjectId(document[1].user),
      date: document[1].reservationdate,
      timeslot: document[1].timeslot.toUpperCase(),
    };
    var reservationDataPM = await Operation.find({
      $or: [reservationPMACTIVE, reservationPMENDED],
    }).populate('desk');
    var resultPM = await Operation.find(requestsPM).populate({
      path: 'request',
      match: { status: { $in: ['accepted', 'pending'] } },
    });

    var requestDataPM = resultPM.filter((item) => item.request != null);
    var resourceToReserve = await DeskService.getDeskByid(document[0].desk);

    if (requestDataAM.length == 1) {
      return {
        status: 201,
        message:
          'You have already a WFH request in ' +
          document[0].reservationdate.split('-').reverse().join('-') +
          ' ' +
          document[0].timeslot.toUpperCase(),
      };
    } else if (reservationDataAM.length == 1) {
      var resourceReserved = reservationDataAM[0].desk;
       
      if (
        resourceToReserve.name.charAt(0) === '-' &&
        resourceReserved.name.charAt(0) === '-'
      ) {
        // return 201;
        return {
          status: 201,
          message:
            'You have already a parking reservation in ' +
            document[0].reservationdate.split('-').reverse().join('-') +
            ' ' +
            document[0].timeslot.toUpperCase(),
        };
      } else if (
        resourceToReserve.name.charAt(0) !== '-' &&
        resourceReserved.name.charAt(0) !== '-'
      ) {
        // return 201;
        return {
          status: 201,
          message:
            'You have already a desk reservation in ' +
            document[0].reservationdate.split('-').reverse().join('-') +
            ' ' +
            document[0].timeslot.toUpperCase(),
        };
      }
    } else if (reservationDataAM.length == 2) {
      // return 201;
      return {
        status: 201,
        message:
          'You have already a reservations in ' +
          document[0].reservationdate.split('-').reverse().join('-') +
          ' ' +
          document[0].timeslot.toUpperCase(),
      };
    }
    var desktestAM = {
      reservationdate: document[0].reservationdate,
      desk: document[0].desk,
      timeslot: document[0].timeslot.toUpperCase(),
    };
    var desktestPM = {
      reservationdate: document[1].reservationdate,
      desk: document[1].desk,
      timeslot: document[1].timeslot.toUpperCase(),
    };
    var d = await Operation.find(desktestAM);
    if (d.length != 0) {
      // return 300;
      return {
        status: 201,
        message:
          'This desk is booked in ' +
          document[0].reservationdate.split('-').reverse().join('-') +
          ' ' +
          document[0].timeslot.toUpperCase(),
      };
    } else {
      var resourceToReserve = await DeskService.getDeskByid(document[0].desk);
      if (resourceToReserve.name.charAt(0) === "-" ) {
        var reservationDate = new Date(document[0].reservationdate);
        var Now = new Date();
        console.log("reservationDate",reservationDate.getTime())
        console.log("Now",Now.getTime())

        if (reservationDate.toISOString().substring(0,10) != Now.toISOString().substring(0,10))
{
  return {
    status: 201,
    message:"the date you have chosen isnt available",

  };
  
} else {
          process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

        var user = await User.findById(document[0].user)
        console.log("registrationNumber",user);
 
        const result = await axios.post(`${process.env.SERVER_PARKING}/addParkingAccessDay/`,
          { 
          "registrationNumber": user.registrationNumber,
          "reservationdate": document[0].reservationdate
          }).then(async (response)=> {

              console.log('Hello there ! ', response)
              if ( response.status == 200  ) {
                access = response.data.data.access
                id = response.data.data.id
                const res0 = await addFunction(document[0],access, id, user, resourceToReserve)
                const res1 = await addFunction(document[1],access, id, user, resourceToReserve)
                return 200
                          
              } 
                else {
                response.error ? console.log(response.error) : console.log(response)
                return  res.status(200).json({
                  status: 200,
                  data:  {
                    status: 201,
                    message:
                    "Ooops! Something Went Wrong!"
                                  },
                  message: "Error",
                });    
              }
          }).catch(e => {
            console.log(e)
            return  res.status(200).json({
              status: 200,
              data:  {
                status: 201,
                message:
                  'Error connection'
              },
              message: "Error",
            });  
          })
          return result
      }}
      else {
      var user = await User.findOne({ _id: document[0].user });

      var OperationnAM = await Operation.create({
        status: 'ACTIVE',
        timeslot: document[0].timeslot,
        user: document[0].user,
        desk: document[0].desk,
        manager: user.manager,
        reservationdate: document[0].reservationdate,
        OperationType: 'RESERVATION',
      });

      if (requestDataPM.length == 1) {
        await Operation.findByIdAndDelete(OperationnAM.id);

        return {
          status: 201,
          message:
            'You have already a WFH request in ' +
            document[1].reservationdate.split('-').reverse().join('-') +
            ' ' +
            document[1].timeslot.toUpperCase(),
        };
      } else if (reservationDataPM.length == 1) {
        var resourceReserved = reservationDataPM[0].desk;
         
        await Operation.findByIdAndDelete(OperationnAM.id);

        if (
          resourceToReserve.name.charAt(0) === '-' &&
          resourceReserved.name.charAt(0) === '-'
        ) {
          // return 201;

          return {
            status: 201,
            message:
              'You have already a parking reservation in ' +
              document[1].reservationdate.split('-').reverse().join('-') +
              ' ' +
              document[1].timeslot.toUpperCase(),
          };
        } else if (
          resourceToReserve.name.charAt(0) !== '-' &&
          resourceReserved.name.charAt(0) !== '-'
        ) {
          // return 201;
          return {
            status: 201,
            message:
              'You have already a desk reservation in ' +
              document[1].reservationdate.split('-').reverse().join('-') +
              ' ' +
              document[1].timeslot.toUpperCase(),
          };
        }
      } else if (reservationDataPM.length == 2) {
        await Operation.findByIdAndDelete(OperationnAM.id);

        // return 201;
        return {
          status: 201,
          message:
            'You have already a reservations in ' +
            document[1].reservationdate.split('-').reverse().join('-') +
            ' ' +
            document[1].timeslot.toUpperCase(),
        };
      }

      var OperationnPM = await Operation.create({
        status: 'ACTIVE',
        timeslot: document[1].timeslot,
        user: document[1].user,
        desk: document[1].desk,
        manager: user.manager,
        reservationdate: document[1].reservationdate,
        OperationType: 'RESERVATION',
      });

      
      var reservationdate = document[0].reservationdate.substring(0, 10);
      // userData = await UserService.getUserById(document.user);
      desk = await DeskService.getDeskByid(document[0].desk);
       
      var status = 'BOOKED';
      var m = await availabilityService.updateavailabilityDesk(
        reservationdate,
        desk.zone,
        document[0].timeslot,
        document[0].user,
        document[0].desk,
        status,
      );
      var m2 = await availabilityService.updateavailabilityDesk(
        reservationdate,
        desk.zone,
        document[1].timeslot,
        document[1].user,
        document[0].desk,
        status,
      );

      history = await HistoryService.addNewHistory({
        Reservation: {
          status: 'ACTIVE',
          timeslot: document[0].timeslot,
          desk: document[0].desk,
          user: document[0].user,
          reservationdate: document[0].reservationdate,
        },
        TransactionType: 'RESERVATION',
        user: document[0].user,
      });
      history = await HistoryService.addNewHistory({
        Reservation: {
          status: 'ACTIVE',
          timeslot: document[1].timeslot,
          desk: document[1].desk,
          user: document[1].user,
          reservationdate: document[1].reservationdate,
        },
        TransactionType: 'RESERVATION',
        user: document[1].user,
      });
      return 200;
    }
      }
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

const addReservationsHistory = async (document, access, idUser) => {
  var reservationdate = document.reservationdate.substring(0, 10);
  user = await UserService.getUserById(document.user);
   
  desk = await DeskService.getDeskByid(document.desk);
   
  var status = 'BOOKED';
  var m = await availabilityService.updateavailabilityDesk(
    reservationdate,
    desk.zone,
    document.timeslot,
    document.user,
    document.desk,
    status,
  );

  history = await HistoryService.addNewHistory({
    Reservation: {
      status: 'ACTIVE',
      timeslot: document.timeslot,
      desk: document.desk,
      user: document.user,
      reservationdate: document.reservationdate,
    },
    TransactionType: 'RESERVATION',
    user: document.user,
  });

  var add_parking = await Parking.create({
    date: document.reservationdate,
    id_reservation: content._id,
    user: {
      id: user._id,
      id_user_Til: idUser,
      firstname: user.firstname,
      lastname: user.lastname,
      matricule: user.registrationNumber,
    },
    access: access,
    timeslot: document.timeslot,
    id_spot: document.desk,
    status: 'ACTIVE',
  });

  return 200;
};

exports.checkReservation = async function (
  user,
  reservationdate,
  timeslot,
  resource,
) {
  try {
    //find if there is another reservation with same desk and date and slot
    //fetch available desks for this user and then create reservation
    //let yourdesks=this.setAvailability(id,date);
     
    var test = 1000;
    var usertest = {
      user: ObjectId(user),
      reservationdate: reservationdate,
      timeslot: timeslot.toUpperCase(),
    };
    // var desktest = {
    //   reservationdate: document.reservationdate,
    //   desk: document.desk,
    //   timeslot: document.timeslot.toUpperCase(),
    // };
    var r = await Operation.find(usertest);
     
    //  var d = await Reservation.find(desktest);
    if (r.length == 1) {
       
      var resourceToReserve = await DeskService.getDeskByid(r[0].desk);
       
      if (resourceToReserve.name.charAt(0) === '-' && resource == 'parking') {
        test = 201;
      } else if (
        resourceToReserve.name.charAt(0) !== '-' &&
        resource == 'Desk'
      ) {
        test = 201;
      } else {
        test = 200;
      }
    } else if (r.length == 2) {
      test = 201;
    }
    // if (d.length != 0) {
    //   return 300;
    // }
    else {
      test = 200;
    }
    return test;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};
exports.ScanQR = async function (user, QRCode) {
  try {
    var date_totomorrow = new Date();
    date_totomorrow.setDate(date_totomorrow.getDate() + 1);
    var date_today = new Date();
    //var date_totomorrow = new Date().getDay() + 1;
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();

    if (hours <= 12 && minutes <= 59) {
      var ampm = 'am';
    } else {
      var ampm = 'pm';
    }

    var strTime = ampm;
    var response = '';
    var d = await DeskService.getDeskByQRCode(QRCode);
    
    var querytest = {
      user: ObjectId(user),
      reservationdate: {
        $gte: date_today.toISOString().substring(0, 10),
        $lt: date_totomorrow.toISOString().substring(0, 10),
      },
      desk: d[0]._id,
      timeslot: strTime.toUpperCase(),
      status: 'ACTIVE',
    };
    var querytestEnded = {
      user: ObjectId(user),
      reservationdate: {
        $gte: date_today.toISOString().substring(0, 10),
        $lt: date_totomorrow.toISOString().substring(0, 10),
      },
      desk: d[0]._id,
      timeslot: strTime.toUpperCase(),
      status: 'ENDED',
    };

    var querytestClosed = {
      user: ObjectId(user),
      reservationdate: {
        $gte: date_today.toISOString().substring(0, 10),
        $lt: date_totomorrow.toISOString().substring(0, 10),
      },
      desk: d[0]._id,
      timeslot: strTime.toUpperCase(),
      status: 'closed',
    };
    var content = await Operation.find({
      $or: [querytestEnded, querytest],
    })
      .populate('desk')
      .populate('user');
    //var contentR = await Reservation.find(querytest).populate('desk').populate('user');
    var AV = await availabilityService.getDeskAvailability(
      QRCode,
      date_today.toISOString().substring(0, 10),
    );

    if (AV[0].statusAM == 'BLOCKED') {
      response = 'Blocked desk';
      return response;
    }
    if (content.length === 0) {
      return 'not available';
    } else if (content.length === 1) {
      if (content[0].status === 'ACTIVE') {
        if (content[0].desk._id.toString() == d[0]._id.toString()) {
          CheckInOperation(content);
          return 'checkIn';
        } else {
          return 'Wrong desk';
        }
      } else if (content[0].status === 'ENDED') {
        CheckOutOperation(content);
        return 'checkOut';
      } else {
        return 'not available';
      }
    }
    
  } catch (e) {
    console.log(e);
    //throw Error(e);
  }
};

const CheckInOperation = async function (content) {
   

  await Operation.findByIdAndUpdate(content[0]._id, {
    status: 'ENDED',
    //history operation checkin
  });
  history = await HistoryService.addNewHistory({
    Reservation: {
      status: 'ENDED',
      timeslot: content[0].timeslot,
      desk: content[0].desk._id,
      reservationdate: content[0].reservationdate,
    },
    TransactionType: 'CHECKIN',
    user: content[0].user._id,
  });

  var reservationdate = content[0].reservationdate
    .toISOString()
    .substring(0, 10);
  
  var status = 'OCCUPIED';
  var m = await availabilityService.updateavailabilityDesk(
    reservationdate,
    content[0].desk.zone.toString(),
    content[0].timeslot.toString(),
    content[0].user,
    content[0].desk._id.toString(),
    status,
  );

  return 200
   
};

const CheckOutOperation = async function (content) {
   

  await Operation.findByIdAndUpdate(content[0]._id, {
    status: 'closed',
    //history operation checkin
  });

  history = await HistoryService.addNewHistory({
    Reservation: {
      status: 'ENDED',
      timeslot: content[0].timeslot,
      desk: content[0].desk._id,
      reservationdate: content[0].reservationdate,
    },
    TransactionType: 'CHECKOUT',
    user: content[0].user._id,
  });

   
  var reservationdate = content[0].reservationdate
    .toISOString()
    .substring(0, 10);

  var status = 'AVAILABLE';
  var m = await availabilityService.updateavailabilityDesk(
    reservationdate,
    content[0].desk.zone,
    content[0].timeslot,
    '',
    content[0].desk._id.toString(),
    status,
  );
};
exports.getAllOperations = async function (users, user) {
  try {

    if ( !user.admin ) {
      var content = await Operation.find( {
        'user': { $in: users },
        'manager': user.id
      }).populate({
          path: 'user',
          select: {'firstname': 1, 'lastname': 1, '_id': 1}
        }).populate({
        path: 'request',
        match: { status:  {$in: ['accepted', 'pending']}},
        populate: {
          path: 'idReciever',
          select: { firstname: 1, lastname: 1, photo: 1, Accesses: 0 },
        },
      })
      .populate({
        path: 'desk',
        select: { 'name': 1, 'zone': 1, 'reservations': 0, '_id': 0},
        populate: {
          path: 'zone',
          select: { 'name': 1, 'floor': 1, 'Desks': 0, '_id': 0 },
          populate: {
            path: 'floor',
            select: { 'name': 1, 'Zones': 0, '_id': 0 },
          },
        },
      });


    } else {
      var content = await Operation.find( {
        'user': { $in: users }}).populate({
          path: 'user',
          select: {'firstname': 1, 'lastname': 1, '_id': 1}
        }).populate({
        path: 'request',
        match: { status:  {$in: ['accepted', 'pending']}},
        populate: {
          path: 'idReciever',
          select: { firstname: 1, lastname: 1, photo: 1, Accesses: 0 },
        },
      })
      .populate({
        path: 'desk',
        select: { 'name': 1, 'zone': 1, 'reservations': 0, '_id': 0},
        populate: {
          path: 'zone',
          select: { 'name': 1, 'floor': 1, 'Desks': 0, '_id': 0 },
          populate: {
            path: 'floor',
            select: { 'name': 1, 'Zones': 0, '_id': 0 },
          },
        },
      });
    }
     
    const result = content.filter(item => item.request != null || item.OperationType == 'RESERVATION')

    return result;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding Operations ");
  }
};

exports.getOperationsByDate = async function (res, start, end) {
  try {
    
    var s = new Date(start)
    var e = new Date(end)
    // var operations = await Operation.aggregate([
    //       { 
    //         $match:{
    //           OperationType: "WFH",
    //           date: {$gte: s, $lt: e},
    //           }
    //       }
    // ])
    // console.log(operations)
    Operation.aggregate([
      { 
        $match:{
          OperationType: "WFH",
          date: {$gte: s, $lt: e},
          }
      },
      {
          $lookup: {
              from: 'users',
              localField: 'user',
              foreignField: '_id',
              as: 'userData'
          }
      },
      {
        $group:{_id:"$userData._id"
          , total: { $sum: 1 }
        }
        
      },
             
    
  ]
    , async function (err, items)  {
            await User.populate(items, {path: '_id', populate:[{path: 'serviceLine' }, {path: 'grade'}] }, async function(err, result) {
              // console.log('items', result)
              var users = []
              await result.map( item => {
                users.push({
                  'User' : item._id.firstname + ' ' + item._id.lastname,
                  'Email': item._id.Email,
                  'Telephone': item._id.telephone,
                  'Grade':  item._id.grade && item._id.grade.grade_name,
                  'SL': item._id.serviceLine && item._id.serviceLine.serviceLine,
                  'SSL': item._id.subServiceLine,
                  'WFH': item.total/2
                  
                })
              })
             
              return  res.json({
                success: true,
                data: users,
                message: "Success",
              });
          });
          
         
        })


  } catch (e) {
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};


exports.getOperationsDate = async function (date) {
  try {
    // console.log('date', date)
    var content = await Operation.find({
      date: date,
    }).populate({
      path: 'request',
      match: { status: 'pending'}
    }).populate('user')

    var operations = content.filter(item => item.request != null)


    return operations;
  } catch (e) {
    console.log(e);
    throw Error('Error while finding Operations ');
  }
};


//clean Operations not validated 
cron.schedule("00 09 * * *",async function(){
  var today = new Date().toISOString().substring(0,10)
  var operations = await OperationService.getOperationsDate(today);

  for (operation of operations) {
    var result = await OperationService.deleteOperation(operation._id, true, true)
  }
      
})

exports.checkInParking = async function (data) {
  try {
    // console.log('date', date)
    console.log('data',data)
    const desk = await DeskService.getDeskByid(data[0].desk)
    const reservation = [{
      _id : data[0]._id,
      timeslot: data[0].timeslot,
      reservationdate: new Date(data[0].reservationdate),
      desk: desk,
      user: data[0].user,
      idReservation_parking: data[0].idReservation_parking
    }]
    var content = await CheckInOperation(reservation)
    await Parking.findByIdAndUpdate(data[0].idReservation_parking, {
      status: "ENDED",
    });
    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error in checkin parking ');
  }
};

exports.freeParking = async function (data) {
  try {
    
     if (!data.isNotified) {
      console.log("notif pour liberer ")
      const reservationdate = new Date(data.date)
      const res = {
        _id : data.id_reservation,
        timeslot: data.timeslot,
        reservationdate : reservationdate,
        desk: data.id_spot,
        user: data.user.id,
        idReservation_parking: data._id
      }
      var user = await User.findById(data.user.id)
      
      //send notif 
      await ParkingService.sendParkingNotif(user.tokenDevice, data._id)
      await ParkingService.updateParking(data._id)

     }
  } catch (e) {
    console.log(e);
    throw Error('Error in checkin parking ');
  }
};


exports.checkoutParking = async function (id) {
  try {

    var parking = await Parking.findById(id).populate(
                                                  {
                                                  path: 'id_reservation',
                                                  populate: {
                                                    path: 'desk'
                                                  }
                                                }
                                                )

                                                

    console.log('parking', parking)

    await Operation.findByIdAndUpdate(parking.id_reservation._id, {
      status: 'closed',
      //history operation checkin
    });
  
    history = await HistoryService.addNewHistory({
      Reservation: {
        status: 'ENDED',
        timeslot: parking.id_reservation.timeslot,
        desk: parking.id_reservation.desk._id,
        reservationdate: parking.id_reservation.reservationdate,
      },
      TransactionType: 'CHECKOUT',
      user: parking.id_reservation.user
    });
  
     
    var reservationdate = parking.id_reservation.reservationdate
      .toISOString()
      .substring(0, 10);
  
    var status = 'AVAILABLE';
    var m = await availabilityService.updateavailabilityDesk(
      reservationdate,
      parking.id_reservation.desk.zone,
      parking.id_reservation.timeslot,
      '',
      parking.id_reservation.desk._id.toString(),
      status,
    );

    await axios.post(`${process.env.SERVER_PARKING}/deleteParkingAccess/`,
    { 
      "access": parking.access,
    }).then(async (response)=> {
      if ( response.status == 200 ) {
        await Parking.findByIdAndDelete(id);
      }
    }).catch(e => {
      console.log(e)
    })

    var content = await Parking.findByIdAndDelete(id)
    return parking
  } catch (e) {
    console.log(e);
    throw Error('Error in checkin parking ');
  }
};
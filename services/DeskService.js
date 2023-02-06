var Desk = require("../models/Desk");
//var ZoneService = require("../services/ZoneService");
var QRCode = require('qrcode');
var ZoneService = require("../services/ZoneService");
const { ObjectId } = require("mongodb");
var History = require("../models/History");
const { updateDesk } = require("../controller/DeskController");
const AvailabilityService = require("./AvailabilityService")

exports.getDesk = async function (query, page, limit) {
  try {
    var Desks = await Desk.find(query);
    return Desks;
  } catch (e) {
    throw Error("Error while Paginating Desks");
  }
};

//get desks status by date (filter by date/floor/zone/timeslot)
//get desk status
exports.getDeskByid = async function (id) {
  try {
    var content = await Desk.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding");
  }
};

exports.addNewDesk = async function (document) {
  try {
    var content = await Desk.create({
      name: document.name,
      isBlocked: document.isBlocked,
      zone: document.zone,
      coordinations_web_am:document.coordinations_web_am,
      coordinations_web_pm:document.coordinations_web_pm,
      cordination_mobile_x: document.cordination_mobile_x,
      cordination_mobile_y : document.cordination_mobile_y,
      QRCode : document.QRCode})
    zone = await ZoneService.getZoneyid(document.zone._id);
    zone.Desks.push(content);
    await zone.save();
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while creating new desk");
  };
};

//Amira : Check impacts on zones/reservations
exports.removeDesk = async function (id) {
  try {
    var content = await Desk.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting");
  }
};

//Amira : check impacts on zones/ reservations (in case we change isBlocked)
exports.updateDesk = async function (id, data) {
  try {
    var content = await Desk.findByIdAndUpdate(id, data);
    content.save();
    return content;
  } catch (e) {
    throw Error("Error while updating");
  }
};








exports.getNumberOfReservations = async function (id,start_date,end_date) {
  try {
    var history = await History.find({createdAt: 
      {
        $gte: start_date,
        $lt: end_date
      }, 'Reservation.desk':ObjectId(id),
      TransactionType: { $in: ["CHECKIN", "CANCELLATION", "RESERVATION"] },}); 
    console.log(history[0].Reservation.desk);
    console.log(history.length);
    return history.length;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations",e);
  }
};

exports.getNumberOfCheckins = async function (id,start_date,end_date) {
  try {
    var history = await History.find({createdAt: 
      {
        $gte: start_date,
        $lt: end_date
      },'Reservation.desk':ObjectId(id),'TransactionType':"CHECKIN"});   
      console.log(history.length)
    return history.length;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of check ins",e);
  }
};

exports.getNumberOfCancellations = async function (id,start_date,end_date) {
  try {
    var history = await History.find(
          
      {createdAt: 
          {
            $gte: start_date, 
            $lt: end_date
           }, 'Reservation.desk':ObjectId(id),
           'TransactionType':"CANCELLATION"
    });
    console.log(history.length);
    return history.length;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of cancellations",e);
  }
};

exports.getDeskByQRCode = async function (query) {
  try {
    var qrcode = { "QRCode" : query}
    var desk = await Desk.find(qrcode);
    // console.log("aaaaaaaa", desk)
    return desk;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding desk");
  }
};

exports.getParkings = async function (query) {
  try {
    var parkings = await Desk.find({name: /^-/i }).select({ '_id': 1, 'name': 1, 'reservations': 0 })
    return parkings;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding parkings");
  }
};



exports.unblockDesks = async function () {
       
  try {   
  

  //  date_totomorrow.setDate(date_totomorrow.getDate() + 1);
      var content =  await Desk.updateMany
              (
              // {
              // Desks: { $elemMatch: { isBlocked: true} },
              // },
              // { 
              // $set: { "Desk.$.isBlocked" : false } 
              // }

              { isBlocked: true },
              { $set:
               {
                isBlocked: false,
        
                 }
               }
              )                                
  
  
    return content;

  } catch (e) {
    console.log(e)
    throw Error("Error while updating");
  }
};

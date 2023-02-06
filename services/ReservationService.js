//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';


var Reservation = require("../models/Reservation");
var History = require("../models/History");
var Availibality = require("../models/Availability");

var Desk = require("../models/Desk");
var Group = require("../models/Group");
var UserService = require("../services/UserService");
var availabilityService = require("../services/AvailabilityService");

var DeskService = require("../services/DeskService");
var HistoryService = require("../services/HistoryService");
var GroupAccessService = require("../services/GroupAccessService");
var IndividualAccessService = require("../services/IndividualAccessService");
var ZoneService = require("../services/ZoneService");
var OperationService = require("../services/OperationService");

const Zone = require("../models/Zone");
const {
  getReservation,
  getFiltredReservation,
  checkIn,
} = require("../controller/ReservationController");
const { ObjectId } = require("mongodb");
const { Mongoose, Error } = require("mongoose");
const date = require("date-and-time");
const cron = require("node-cron");
const { query } = require("express-validator");
const User = require("../models/User");
const Floor = require("../models/Floor");
const nodemailer = require('nodemailer');
const axios = require('axios')
const https = require("https")
const http = require("http");
const { response } = require("express");
 const Parking = require("../models/Parking");
const Operation = require("../models/Operation");



exports.getReservation = async function (query, page, limit) {
  try {
    var Reservations = await Operation.find(query);
    return Reservations;
  } catch (e) {
    throw Error("Error while Paginating Reservations");
  }
};

exports.setAvailability = async function (query, page, limit, id, date) {
  try {
    let zones = [{ id: String }];

    var groupzones = await GroupAccessService.getGroupAccessByUser(id);
    for (const gz of groupzones) {
      zones.push(gz);
    }

    var individualzones = await IndividualAccessService.getIndividualAccessByUser(
      id
    );

    for (const iz of individualzones) {
      zones.push(iz);
    }

    //console.log(zones);
    zones.shift();

    let desks = [{ id: String }];
    for (const zone of zones) {
      for (const d of await ZoneService.getDesksinZone(zone)) {
        desks.push(d);
      }
    }

    desks.shift();
    

    // console.log("HERE ARE THE DESKS***********************************************************",desks);

    // alldesks = await DeskService.getDesk();
    let desksavailability = [];

    for (const d of desks) {
      if (d.isBlocked) {
        desksavailability.push({
          id: d._id,
          statusAM: "BLOCKED",
          userAM: "",
          statusPM: "BLOCKED",
          userPM: "",
          zone: await ZoneService.getZoneName(d.zone),
        });
      } else {
        var querytest = { desk: ObjectId(d._id), reservationdate: date };
        var Reservations = await Reservation.find(querytest);

        if (Reservations.length === 1) {
          if (Reservations[0].timeslot === "AM") {
            desksavailability.push({
              id: d._id,
              statusAM: "BOOKED",
              userAM: Reservations[0].user,
              statusPM: "AVAILABLE",
              userPM: "",
              zone: await ZoneService.getZoneName(d.zone),
            });
          } else {
            desksavailability.push({
              id: d._id,
              statusAM: "AVAILABLE",
              userAM: "",
              statusPM: "BOOKED",
              userPM: Reservations[0].user,
              zone: await ZoneService.getZoneName(d.zone),
            });
          }
        } else if (Reservations.length === 2) {
          desksavailability.push({
            id: d._id,
            statusAM: "BOOKED",
            userAM: Reservations[0].user,
            statusPM: "BOOKED",
            userPM: Reservations[1].user,
            zone: await ZoneService.getZoneName(d.zone),
          });
        } else {
          //console.log("AAAAAAA",d);

          desksavailability.push({
            id: d._id,
            statusAM: "AVAILABLE",
            userAM: "",
            statusPM: "AVAILABLE",
            userPM: "",
            zone: await ZoneService.getZoneName(d.zone),
          });
        }
      }
    }

    
    

    return desksavailability;
  } catch (e) {
    throw Error(e);
  }
};

exports.getOperationById = async function (id) {
  try {
    var content = await Operation.findById(id);
    return content;
  } catch (e) {
    throw Error("Error while finding reservation");
  }
};


const addFunction = async (document, access, idUser) => {

      var content = await Operation.create({
          status: "ACTIVE",
          timeslot: document.timeslot,
          user: document.user,
          desk: document.desk,
          reservationdate: document.reservationdate,
        });
        var reservationdate= document.reservationdate.substring(0,10);
        user = await UserService.getUserById(document.user);
        // console.log("conteeeeeeeeeeeent", content)
        desk = await DeskService.getDeskByid(document.desk);
        // console.log("salem", user)
        var status="BOOKED";
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
const addReservationsHistory = async (document, access, idUser) => {


    var reservationdate= document.reservationdate.substring(0,10);
    user = await UserService.getUserById(document.user);
    // console.log("conteeeeeeeeeeeent", content)
    desk = await DeskService.getDeskByid(document.desk);
    // console.log("salem", user)
    var status="BOOKED";
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

exports.addNewReservation = async function (document) {
  try {
    
    var usertest = {
      user: ObjectId(document.user),
      reservationdate: document.reservationdate,
      timeslot: document.timeslot.toUpperCase(),
    };
    var desktest = {
      reservationdate: document.reservationdate,
      desk: document.desk,
      timeslot: document.timeslot.toUpperCase(),
    };
    var r = await Reservation.find(usertest);
    var d = await Reservation.find(desktest).populate({path:"desk",select:{"name":1}});
    if (r.length == 1) {
       
      var resourceReserved = r[0].desk;
      
      var resourceToReserve = await DeskService.getDeskByid(document.desk)
       
      if (resourceToReserve.name.charAt(0) === "-" && resourceReserved.name.charAt(0) === "-") {
        return 201;
      } else  if (resourceToReserve.name.charAt(0) !== "-" && resourceReserved.name.charAt(0) !== "-") {
        return 201;
      } 

     }
  else if (r.length == 2) {
      return 201;
    }
    if (d.length != 0) {
      return 300;
    } else {
      
      var resourceToReserve = await DeskService.getDeskByid(document.desk)
     if (resourceToReserve.name.charAt(0) === "-" ) {
      if (document.timeslot.toUpperCase() ==="AM") {
        slot = 255
        ValidityTimeStart.setHours(8);
        ValidityTimeEnd.setHours(14);

      } else {
        slot = 255
        ValidityTimeStart.setHours(14);
        ValidityTimeEnd.setHours(20);
      }
  
      const token = '{c7cc928f-7da1-4f08-8342-7050fd10fca5}'
      


      process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

      var user = await UserService.getUserById(document.user)

      

      axios.get(`https://213.150.188.163/api/users?fields=id,GPN&filter=GPN=${user.registrationNumber}`, 
      {
        headers: {
          'x-api-key': `${token}`
        }
      }
      ).then(response =>  { 
        
        
       const id = response.data.data[0].id
       const data = [ 
        {
          "detail": {
            "connection": "k_online",
            "constructor": "k_undefined",
            "id": 48,

          },
          "timeslot": {
            "id": slot
          },
          "validityEndDateTime": ValidityTimeEnd,
          "validityStartDateTime": ValidityTimeStart
        },
        {
          "detail": {
            "connection": "k_online",
            "constructor": "k_undefined",
            "id": 49,
          },
          "timeslot": {
            "id": slot
          },
          "validityEndDateTime": ValidityTimeEnd,
          "validityStartDateTime": ValidityTimeStart
        }]
       axios.post(`https://213.150.188.163/api/users/${id}/accesses`, 
      data,
      {
        headers: {
          'x-api-key': `${token}`
        }
      }
      ).then( (response)  =>   { 
        
        
       
       const data = response.data.data
       let access = []
       
       data.map( (item) => {
        access.push(item.id)

       })
      
     // console.log(addFunction(document,access, id));
     addFunction(document,access, id);


 
      })
      .catch( error => {
         console.log(error)

      }) 
      })
      .catch( error => {
         console.log(error)

      }) 
     } 
  
    else {
      var OperationResult=await OperationService.addReservation(document);
if (OperationResult.Status.toString()=="200")
{ 
  var content = await Reservation.create({
  status: "ACTIVE",
  timeslot: document.timeslot,
  user: document.user,
  desk: document.desk,
  reservationdate: document.reservationdate,
});
var reservationdate= document.reservationdate.substring(0,10);
user = await UserService.getUserById(document.user);
desk = await DeskService.getDeskByid(document.desk);
// console.log("salem", user)
var status="BOOKED";
var m = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone,document.timeslot,document.user,document.desk,status);
var zone = await ZoneService.getZoneyid(desk.zone)
var floor = await Floor.findById(zone.floor)
user.reservations.push({
id: content._id,
status: "ACTIVE",
timeslot: document.timeslot,
desk: document.desk,
reservationdate: document.reservationdate,
zone: zone.name,
floor: floor.name,
desk: desk.name,
})

var u = await UserService.updateUser(document.user, user)



//  var content = await User.findByIdAndUpdate(document.user, user);

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
return 200;
}
    else{ 
      
      return 201 ;
    }

/////////////////////////////////////////////////////////



    
  }
  }
  
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

exports.cancelReservation = async function (id) {
  try {
    //var reservation = await Reservation.findByIdAndUpdate(id, {
    //  status: "CANCELLED"} );
    //update history as new model
    var reservation = await Reservation.findById(id);
    history = await HistoryService.addNewHistory({
      Reservation: {
        status: "CANCELLED",
        timeslot: reservation.timeslot,
        desk: reservation.desk,
        reservationdate: reservation.reservationdate,
      },
      TransactionType: "CANCELLATION",
      user: reservation.user,
    });
    // console.log(history);
    // console.log(reservation);
    //var reservationdate = reservation.reservationdate.toISOString().substring(0,10);
    
    //user = await UserService.getUserById(reservation.user);
    
    //user.reservations = user.reservations.filter(item => item.id != id )
    //var u = await UserService.updateUser(reservation.user, user)
    var reservationdate= reservation.reservationdate.toISOString().substring(0,10);
    desk = await DeskService.getDeskByid(reservation.desk);
    var status="AVAILABLE";
    var m = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone.toString(),reservation.timeslot.toString(),"",reservation.desk.toString(),status);
    await Reservation.findByIdAndDelete(id);
     await Operation.findByIdAndDelete(id);

    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 
    if (desk.name.charAt(0) === "-" ) {
      const token = '{c7cc928f-7da1-4f08-8342-7050fd10fca5}'
      var querytest = {id_reservation: id};
      const data = await Parking.find(querytest)
      
      data[0].access.map((acces) => {
        axios.delete(`https://213.150.188.162/api/userAccesses/${acces}`,
          {
            headers: {
              'x-api-key': `${token}`
            }
          }
          ).then(response => {
            console.log("deleted")
          }).catch(error => {
            console.log(error)
          })
      })

      await Parking.findByIdAndDelete(data[0].id);


    }
    return reservation;
  } catch (e) {
    console.log(e)
    throw Error(e);
  }
};

exports.checkIn = async function (id) {
  try {
    var reservation = await Reservation.findById(id);
    desk = await DeskService.OccupyDesk(reservation.desk._id);
    history = await HistoryService.addNewHistory({
      Reservation: {
        status: "ACTIVE",
        timeslot: reservation.timeslot,
        desk: reservation.desk._id,
        reservationdate: reservation.reservationdate,
      },
      TransactionType: "CHECK-IN",
      user: reservation.user._id,
    });
    

    return reservation;
  } catch (e) {
    throw Error("Error while deleting");
  }
};

exports.checkOut = async function (id) {
  try {
    var reservation = await Reservation.findById(id);
    desk = await DeskService.freeDesk(reservation.desk._id);
    history = await HistoryService.addNewHistory({
      Reservation: {
        status: "ENDED",
        timeslot: reservation.timeslot,
        desk: reservation.desk._id,
        reservationdate: reservation.reservationdate,
      },
      TransactionType: "CHECK-OUT",
      user: document.user._id,
    });

    user = await UserService.getUserById(reservation.user);
    
    

    user.reservations = user.reservations.filter(item => item.id != id )
    var u = await UserService.updateUser(reservation.user, user)
    var reservationdate= document.reservationdate.substring(0,10);
    desk = await DeskService.getDeskByid(reservation.desk._id);
    var status="AVAILABLE";
    var m = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone,reservation.timeslot,document.user._id,reservation.desk._id,status);
   
    // console.log(history);
    // console.log(reservation);

    return reservation;
  } catch (e) {
    throw Error("Error while deleting");
  }
};

exports.removeReservation = async function (id) {
  try {
    var content = await Reservation.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error("Error while deleting");
  }
};
exports.getReservationByDeskid = async function (QRCode) {
  try {
    var querytest = { desk: ObjectId(QRCode) };
    var content = await Reservation.find(querytest);
    return content;
  } catch (e) {
    throw Error("Error while finding reservation");
  }
};
//get reservation by user id
exports.getReservationByDate = async function (Date) {
  try {
    var querytest = { Date: Date };
    var content = await Reservation.find(querytest);
    
    return content;
  } catch (e) {
    throw Error("Error while finding reservation");
  }
};
exports.get_Scan_Results = async function (user, Date, QRCode) {
  try {
    return ReservationService.getFiltredReservation(user, Date, QRCode);
  } catch (e) {
    throw Error("Error while getting scan results");
  }
};

//service qui lit le qrcode et retourne l'etat du desk qui a ce qr code
//if the user that made the reservation howa nafsou eli yakra fel qrcode and same date

//getdeskstatus qui parcoure la liste mtaa les desks w yakra status

// exports.getcardreservation = async function (id) {
//   try {
//     var querytest = { user: id };
//     let cardreservation = [];
//     var Reservations = await Reservation.find(querytest);
//     // console.log("FOUND RESERVATIONS", Reservations);
//     // console.log(Reservations.length);
//     for (const reservation of Reservations) {
//       iduser = reservation.user;
//       iddesk = reservation.desk;
//       (idzone = reservation.zone),
//         (user = await UserService.getUserById(iduser)),
//         (deskdata = await DeskService.getDeskByid(iddesk));
//       zonedata = await ZoneService.getZoneyid(deskdata.zone);
//       floordata = await FloorService.getFlooryid(zonedata.floor);
//       // console.log(zonedata);
//       floordata = await FloorService.getFlooryid(zonedata.floor);
//       //   console.log(deskdata);
//       cardreservation.push({
//         id: reservation.id,
//         Desk: deskdata.name,
//         zone: zonedata.name,
//         floor: floordata.name,
//         time: reservation.reservationdate,
//         slot: reservation.timeslot,
//       });
//       // cardreservation.push({id:reservation.id,Desk:"deskdata.name",zone:"zonedata.name",floor:"floordata.name",time:"reservation.reservationdate",slot:reservation.timeslot});
//       // cardreservation.push([{id:reservation.id},{Desk:"deskdata.name"},{zone:"zonedata.name"},{floor:"floordata.name"},{time:"reservation.reservationdate"},{slot:reservation.timeslot}}]);

//       //  console.log(reservation);
//     }

//     //console.log(cardreservation);

//     return cardreservation;
//   } catch (e) {
//     console.log(e);
//     throw Error("Error while getting card reservation");
//   }
// };

exports.getcardreservation = async function (id) {
  try {
    
    var cardreservation = [];
    var user = await User.findById(id);
    user.reservations.map((reservation) => {
      cardreservation.push({
        id: reservation.id,
        Desk: reservation.desk,
        zone: reservation.zone,
        floor: reservation.floor,
        time: reservation.reservationdate,
        slot: reservation.timeslot,
      });
    })
      

    

    //console.log(cardreservation);

    return cardreservation;
  } catch (e) {
    console.log(e);
    throw Error("Error while getting card reservation");
  }
};




// exports.getFiltredReservation = async function (user, QRCode) {
//   try {
//     let date_ob = new Date();
//     var date_now = date_ob.getDate();
//     console.log(date_now);
//     var year = date_ob.getFullYear();
//     console.log(year);
//     var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
//     console.log(month);
//     var date_today = year + "-" + month + "-" + date_now;
//     date_now = date_now + 1;
//     var date_totomorrow = year + "-" + month + "-" + date_now;
//     console.log(date_today);
//     var hours = date_ob.getHours();
//     console.log(hours);
//     var minutes = date_ob.getMinutes();
//     console.log(hours + ":" + minutes);
//     console.log(minutes);
//     var ampm = hours >= 12 ? "pm" : "am";
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? "0" + minutes : minutes;
//     var strTime = ampm;
//     console.log(strTime);
//     var response = "";
//     var querytest = {
//       user: ObjectId(user),
//       reservationdate: { $gte: date_today, $lt: date_totomorrow },
//       desk: ObjectId(QRCode),
//       timeslot: strTime.toUpperCase(),
//     };
//     var content = await Reservation.find(querytest);
//     if (content.length === 0) {
//       console.log("maandkch reservation barra rawah");
//       response = "not available";
//     }
//     if (content.length === 1) {
//       if (content[0].status === "ACTIVE") {
//         console.log("dkhalt");
//         await Reservation.findByIdAndUpdate(content[0]._id, {
//           status: "ENDED",
//           //history operation checkin
//         });
//           history = await HistoryService.addNewHistory({
//             Reservation: {
//               status: "ENDED",
//               timeslot: content[0].timeslot,
//               desk: content[0].desk,
//               reservationdate: content[0].reservationdate,
//             },
//             TransactionType: "CHECKIN",
//             user: content[0].user,
//           });

//           console.log("changed");
//           response = "checkIn";
//         } else {
//           //history operation checkout
//           //remove from reservation
//           history = await HistoryService.addNewHistory({
//             Reservation: {
//               status: "ENDED",
//               timeslot: content[0].timeslot,
//               desk: content[0].desk,
//               reservationdate: content[0].reservationdate,
//             },
//             TransactionType: "CHECKOUT",
//             user: content[0].user,
//           });
//           await Reservation.findByIdAndRemove(content[0]._id);

//           var reservationdate= content[0].reservationdate.toISOString().substring(0,10);
//           desk = await DeskService.getDeskByid(content[0].desk);
//           var status="AVAILABLE";
//           var m = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone,content[0].timeslot,"", content[0].desk.toString(),status);
        
//           response = "checkOut";
//         }
//     }
//     return response;
//   } catch (e) {
//     console.log(e);
//     throw Error(e);
//   }
// };
const CheckInOperation = async function (content) {

  await Reservation.findByIdAndUpdate(content[0]._id, {
    status: "ENDED",
    //history operation checkin
  });
  history = await HistoryService.addNewHistory({
    Reservation: {
      status: "ENDED",
      timeslot: content[0].timeslot,
      desk: content[0].desk._id,
      reservationdate: content[0].reservationdate,
    },
    TransactionType: "CHECKIN",
    user: content[0].user._id,
  });

  var reservationdate= content[0].reservationdate.toISOString().substring(0,10);
  var status="OCCUPIED";
  var m = await  availabilityService.updateavailabilityDesk(reservationdate, content[0].desk.zone.toString(), content[0].timeslot.toString(),content[0].user, content[0].desk._id.toString(),status);
  console.log("changed");

}


const CheckOutOperation = async function (content) {

  history = await HistoryService.addNewHistory({
    Reservation: {
      status: "ENDED",
      timeslot: content[0].timeslot,
      desk: content[0].desk._id,
      reservationdate: content[0].reservationdate,
    },
    TransactionType: "CHECKOUT",
    user: content[0].user._id,
  });

  console.log("idddddddddddd", content[0]._id)
  console.log("befoooooooooore", content[0].user.reservations )
  content[0].user.reservations = await content[0].user.reservations.filter(item => item.id.toString() != content[0]._id.toString() )
  var u = await UserService.updateUser(content[0].user._id, {
    "reservations" : content[0].user.reservations
  } )

  console.log("afteeeeeeeeeeeeeeer", content[0].user.reservations)
  await Reservation.findByIdAndRemove(content[0]._id);
  var reservationdate = content[0].reservationdate
    .toISOString()
    .substring(0, 10);

  var status = "AVAILABLE";
  var m = await availabilityService.updateavailabilityDesk(
    reservationdate,
    content[0].desk.zone,
    content[0].timeslot,
    "", 
    content[0].desk._id.toString(),
    status
  );

}
exports.getFiltredReservation = async function (user, QRCode) {
  try {
    let date_ob = new Date();
    var date_now = date_ob.getDate();
    var year = date_ob.getFullYear();
    var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // console.log("month", month)
    var date_today = year + "-" + month + "-" + date_now;
    date_now = date_now + 1;
    var date_totomorrow = year + "-" + month + "-" + date_now;
 
    var hours = date_ob.getHours();

    var minutes = date_ob.getMinutes();

    //var ampm = hours >= 12 ? "pm" : "am";
    //hours = hours % 12;
    //hours = hours ? hours : 12; // the hour '0' should be '12'
    //minutes = minutes < 10 ? "0" + minutes : minutes;
    if ( hours <=12 && minutes <= 59)
    {
	    var ampm = "am";
    }
    else {
	    var ampm="pm";
      }

    var strTime = ampm;
    var response = "";
    var d = await DeskService.getDeskByQRCode(QRCode);
    var querytest = {
      user: ObjectId(user),
      reservationdate: { $gte: date_today, $lt: date_totomorrow },
      // desk: d,
      timeslot: strTime.toUpperCase(),
    };
    var content = await Reservation.find(querytest).populate('desk').populate('user');
 
    
    // console.log("d", d[0]._id)
    if (content.length === 0) {
      response = "not available";
    }
    if (content.length === 1) {
      if (content[0].status === "ACTIVE") {
        if (content[0].desk._id.toString() == d[0]._id.toString() ) {
          CheckInOperation(content)
          response = "checkIn";
        } else {
          response = "Wrong desk"
        }
        
      } else {
        
         CheckOutOperation(content)
        response = "checkOut";
      }
    }
    console.log("responsssssse", response)
    return response;
  } catch (e) {
    console.log(e);
    //throw Error(e);
  }
};



// exports.getDeskAccess = async function (id, QRCode) {
//   try {
        
//     var desk = await DeskService.getDeskByQRCode(QRCode);
//     console.log("ussssssssssssser", desk)
//     // var userAccess = await ZoneService.getAccesZone(user);
//     let zones = [];
//     let Zonesacess = [];
//     try {
//       var groupzones = await GroupAccessService.getGroupAccessByUser(id);
//       if (groupzones) {
//         for (const gz of groupzones) {
//           var i = 0;
//           zones.push(await ZoneService.getZoneyid(gz));
//           i++;
//         }
//       }
      
//       var individualzones = await IndividualAccessService.getIndividualAccessByUser(
//         id
//       );
//       if (individualzones) {
//         for (const idz of individualzones) {
//           zones.push(await ZoneService.getZoneyid(idz));
//         }
//       }
//       for (const zone of zones) {
//         Zonesacess.push(zone.id)
//       }
//   } catch (e) {
//     throw Error(e);
//   }
  
//     var response = Zonesacess.includes(desk[0].zone.toString());
//     return response

//   } catch (e) {
//     console.log(e);
//     throw Error(e);
//   }
// };
exports.getDeskAccess = async function (id, QRCode) {
  try {
        

    var desk = await DeskService.getDeskByQRCode(QRCode);
    var groupzones = await GroupAccessService.getGroupAccessByUser(id);

    var individualzones = await IndividualAccessService.getIndividualAccessByUser(
      id
    );
    const zones = groupzones.concat(individualzones);
    const even = (element) => element._id.toString() == desk[0].zone.toString();
    var response = zones.some(even)
    return response

  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

exports.getReservationByFloor = async function (id) {
  try {
    var reservations = await Reservation.find();
    let cardreservation = [];
    for (const r of reservations) {

      // console.log(r.desk)
       
      var desk = await Desk.findById(r.desk);
      // console.log("desk ", desk)
      var zone = await Zone.findById(desk.zone);
      // console.log("zoneeeeee", zone.floor)
      if (zone.floor == id) {
        var user = await User.findById(r.user)
        if (r.timeslot =="AM"){
          var date = r.reservationdate.toISOString().substring(0,10)
          var StartTime = date.concat("T06:00:00.000Z");
          var EndTime = date.concat("T11:00:00.000Z");
          // var year = parseInt(r.reservationdate.toISOString().substring(0,4)) 
          // console.log("year str", year)
       
         
          // var month = r.reservationdate.toISOString().substring(5,2)
          // console.log("month str", r.reservationdate)
          // if (month[0] == "0") {
          //   month = month.substring(1);
          // }
          
          // var day = r.reservationdate.toISOString().substring(8,2)
          // var StartTime = new Date(year-1, parseInt(month)-1, parseInt(day), 8, 00);
          // console.log("daaaaaaaate", StartTime);
          // var year = r.reservationdate.toISOString().substring(0,4)
          // var month = r.reservationdate.toISOString().substring(5,2)
          // if (month[0] == "0") {
          //   month = month.substring(1);
          // }
          // var day = r.reservationdate.toISOString().substring(8,2)
          // var EndTime = new Date(2021, 4, 27, 13, 00);
          // console.log("daaaaaaaate", EndTime);

  

        } else {
            var date = r.reservationdate.toISOString().substring(0,10)
            var StartTime = date.concat("T06:00:00.000Z");
            var EndTime = date.concat("T11:00:00.000Z");
        }

          cardreservation.push({
            id: r._id,
            StartTime: StartTime,
            EndTime: EndTime,
            Subject: user.firstname + " " + user.lastname,
            IsReadonly: true,
            Location : zone.name,
            ZoneId: desk.zone,
            DeskId: r.desk,
            Color: '#0e44a1'
            // zone: desk.zone,
            // time: r.reservationdate,
            // slot: r.timeslot,
          });
        }
        
      } 
    
    

    return cardreservation;
  } catch (e) {
    console.log(e);
    throw Error("Error while getting card reservation");
  }
};



exports.checkReservation = async function (user,reservationdate,timeslot,resource) {
    try {
      //find if there is another reservation with same desk and date and slot
      //fetch available desks for this user and then create reservation
      //let yourdesks=this.setAvailability(id,date);
             
      var test=1000;
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
      var r = await Reservation.find(usertest);
      var O= await Operation.find(usertest);

     // console.log("usertesttttttt ", r.length)
    //  var d = await Reservation.find(desktest);
      if (r.length == 1 || o.length == 1) {
        // console.log("usertest ", r)
        // console.log("deeeesk", desktest)
        // console.log("reserved ", resourceReserved)
      //  console.log("usertest ", r[0].desk)
        var resourceToReserve = await DeskService.getDeskByid(resource)
       // console.log("to reserve ", resourceToReserve)
        if (resourceToReserve.name.charAt(0) === "-" && resource=="parking") {
          test= 201;
        } else  if (resourceToReserve.name.charAt(0) !== "-" &&resource=="Desk") {
          test= 201;
        }
        else{
          test=200;
        }
     
      } else if (r.length == 2) {
        test= 201;
      }
      // if (d.length != 0) {
      //   return 300;
      // }
       else {
       test= 200;
    }
    return test;
    } catch (e) {
      console.log(e);
      throw Error(e);
    }
  };

exports.deleteReservation = async function (id) {
  try {
    //var reservation = await Reservation.findByIdAndUpdate(id, {
    //  status: "CANCELLED"} );
    //update history as new model
    var reservation = await Reservation.findById(id);

    History.deleteOne({ size: 'large' }, function (err) {
      if (err) return handleError(err);
      // deleted at most one tank document
    });
    // history = await HistoryService.addNewHistory({
    //   Reservation: {
    //     status: "CANCELLED",
    //     timeslot: reservation.timeslot,
    //     desk: reservation.desk,
    //     reservationdate: reservation.reservationdate,
    //   },
    //   TransactionType: "CANCELLATION",
    //   user: reservation.user,
    // });
    // // console.log(history);
    // // console.log(reservation);
    // //var reservationdate = reservation.reservationdate.toISOString().substring(0,10);
    
    // user = await UserService.getUserById(reservation.user);
    
    // user.reservations = user.reservations.filter(item => item.id != id )
    // var u = await UserService.updateUser(reservation.user, user)
    // var reservationdate= reservation.reservationdate.toISOString().substring(0,10);
    // desk = await DeskService.getDeskByid(reservation.desk);
    // var status="AVAILABLE";
    // var m = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone.toString(),reservation.timeslot.toString(),"",reservation.desk.toString(),status);
    // await Reservation.findByIdAndDelete(id);
    // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 
    // if (desk.name.charAt(0) === "-" ) {
    //   const token = '{9fa7f322-c64f-45fb-85a1-3da3b4b1de9f}'
    //   var querytest = {id_reservation: id};
    //   const data = await Parking.find(querytest)
      
    //   data[0].access.map((acces) => {
    //     axios.delete(`https://172.20.234.92/api/userAccesses/${acces}`,
    //       {
    //         headers: {
    //           'x-api-key': `${token}`
    //         }
    //       }
    //       ).then(response => {
    //         console.log("deleted")
    //       }).catch(error => {
    //         console.log(error)
    //       })
    //   })

    //   await Parking.findByIdAndDelete(data[0].id);


    // }


    return reservation;
  } catch (e) {
    console.log(e)
    throw Error(e);
  }
};



exports.addNewReservations = async function (document) {
  try {

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

    var usertestAM = {
      user: ObjectId(document[0].user),
      reservationdate: document[0].reservationdate,
      timeslot: document[0].timeslot.toUpperCase(),
    };

    var usertestPM = {
      user: ObjectId(document[1].user),
      reservationdate: document[1].reservationdate,
      timeslot: document[1].timeslot.toUpperCase(),
    };
 
     var dAM = await Reservation.find(desktestAM);
     var dPM = await Reservation.find(desktestPM);
     var rAM = await Reservation.find(usertestAM);
     var rPM = await Reservation.find(usertestPM);

     if (rAM.length != 0 || rPM.length !=0) {
       
      return 201;
      
    } 

    
   
    if (dAM.length != 0 || dPM.length !=0) {
      return 300;
    } else {
    var AM = await Reservation.create({
      status: "ACTIVE",
      timeslot: document[0].timeslot,
      user: document[0].user,
      desk: document[0].desk,
      reservationdate: document[0].reservationdate,
    });
    console.log(AM.toString());

    var dPM = await Reservation.find(desktestPM);
    if ( dPM.length !=0) {
      await Reservation.findByIdAndDelete(AM.id);
      return 300;
    }
    else{
   var PM = await Reservation.create({
      status: "ACTIVE",
      timeslot: document[1].timeslot,
      user: document[1].user,
      desk: document[1].desk,
      reservationdate: document[1].reservationdate,
    });

      var resourceToReserveAM = await DeskService.getDeskByid(document[0].desk)
 

    }
  


     if (resourceToReserveAM.name.charAt(0) === "-" ) {
      slotAM = 1001
      slotPM = 1002
    
  
      const token = '{c7cc928f-7da1-4f08-8342-7050fd10fca5}'
      


     // process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0; 

      var user = await UserService.getUserById(document[0].user)
  //    console.log("user ", user)

    await  axios.get(`https://213.150.188.162/api/users?fields=id,GPN&filter=GPN=${user.registrationNumber}`, 
      {
        headers: {
          'x-api-key': `${token}`
        }
      }
      ).then(response =>  { 
     //  console.log("response ", response.data.data)
       const id = response.data.data[0].id
       const data = [ 
        {
          "detail": {
            "connection": "k_online",
            "constructor": "k_undefined",
            "id": 1,
            "name": "ENTREE",
            "type": "k_reader"
          },
          "timeslot": {
            "id": slotAM
          }
        },
        {
          "detail": {
            "connection": "k_online",
            "constructor": "k_undefined",
            "id": 2,
            "name": "SORTIE",
            "type": "k_reader"
          },
          "timeslot": {
            "id": slotAM
          }
        }]
       axios.post(`https://213.150.188.162/api/users/${id}/accesses`, 
      data,
      {
        headers: {
          'x-api-key': `${token}`
        }
      }
      ).then( (response)  =>   { 
       
       const data = response.data.data
       let access = []
       
       data.map( (item) => {
        access.push(item.id)

       })
     //  console.log("access added", access)
   addReservationsHistory(document[0],access,id)
      
 
      })
      .catch( error => {
         console.log(error)

      }) 
      })
      .catch( error => {
         console.log(error)

      }) ;

   await   axios.get(`https://213.150.188.162/api/users?fields=id,GPN&filter=GPN=${user.registrationNumber}`, 
      {
        headers: {
          'x-api-key': `${token}`
        }
      }
      ).then(response =>  { 
     //  console.log("response ", response.data.data)
       const id = response.data.data[0].id
       const data = [ 
        {
          "detail": {
            "connection": "k_online",
            "constructor": "k_undefined",
            "id": 1,
            "name": "ENTREE",
            "type": "k_reader"
          },
          "timeslot": {
            "id": slotPM
          }
        },
        {
          "detail": {
            "connection": "k_online",
            "constructor": "k_undefined",
            "id": 2,
            "name": "SORTIE",
            "type": "k_reader"
          },
          "timeslot": {
            "id": slotPM
          }
        }]
       axios.post(`https://213.150.188.162/api/users/${id}/accesses`, 
      data,
      {
        headers: {
          'x-api-key': `${token}`
        }
      }
      ).then( (response)  =>   { 
       
       const data = response.data.data
       let access = []
       
       data.map( (item) => {
        access.push(item.id)

       })
     //  console.log("access added", access)
     addReservationsHistory(document[1],access,id)
      
 
      })
      .catch( error => {
         console.log(error)

      }) 
      })
      .catch( error => {
         console.log(error)

      }) 




     } else {
     

      var reservationdate= document[0].reservationdate.substring(0,10);
      user = await UserService.getUserById(document[0].user);
      desk = await DeskService.getDeskByid(document[0].desk);
      // console.log("salem", user)
      var status="BOOKED";
      var mAM = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone,document[0].timeslot,document[0].user,document[0].desk,status);

     var mPM = await  availabilityService.updateavailabilityDesk(reservationdate, desk.zone,document[1].timeslot,document[1].user,document[0].desk,status);
     var zone = await ZoneService.getZoneyid(desk.zone)
     var floor = await Floor.findById(zone.floor)
     await user.reservations.push({
      id: AM._id,
      status: "ACTIVE",
      timeslot: document[0].timeslot,
      desk: document[0].desk,
      reservationdate: document[0].reservationdate,
      zone: zone.name,
      floor: floor.name,
      desk: desk.name,
     });
     await user.reservations.push({
      id: PM._id,
      status: "ACTIVE",
      timeslot: document[1].timeslot,
      desk: document[1].desk,
      reservationdate: document[1].reservationdate,
      zone: zone.name,
      floor: floor.name,
      desk: desk.name,
     })
    // console.log("addddddddddddddddddddddddddddddddddddddddded", user.reservations)
    // console.log("usssssssssssssssssssssssssser", user)
    var u = await UserService.updateUser(document[1].user, user)
  //  console.log("hhhhhhhhh")
 //   console.log(u.toString());

    //  var content = await User.findByIdAndUpdate(document.user, user);
   // console.log("hhhhhhhhh")
     historyAM = await HistoryService.addNewHistory({
        Reservation: {
          status: "ACTIVE",
          timeslot: document[0].timeslot,
          desk: document[0].desk,
          user: document[0].user,
          reservationdate: document[0].reservationdate,
        },
        TransactionType: "RESERVATION",
        user: document[0].user,
      });
      historyPM = await HistoryService.addNewHistory({
        Reservation: {
          status: "ACTIVE",
          timeslot: document[1].timeslot,
          desk: document[1].desk,
          user: document[1].user,
          reservationdate: document[1].reservationdate,
        },
        TransactionType: "RESERVATION",
        user: document[0].user,
      });
      return 200;
    }
    }
  
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

// exports.getAvailabilityZones = async function (document) {
//   try {    
//     let AV = [];
    
//      for (const idz of document.idZone) {
//   await  Availibality.find({date: document.selectedDate, Zone:  ObjectId(idz.id)}).then(docs => {
//   //  console.log("docs",docs);

//     AV.push(docs);
//  });
 
// }
//  return AV;
//   } catch (e) {
//     console.log(e);
//     throw Error(e);
//   }
// };


exports. getAvailabilityZones = async function (document) {
  try {    
    let AV = [];
    console.log("document",document)
     for (const idz of document.idZone) {
  await  Availibality.find({date: document.selectedDate, Zone:  ObjectId(idz.zone_id)}).then(docs => {
    AV.push(docs);
 });
}
 return AV;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};



exports.AddOperations = async function () {
  try {
    var date_reservation = new Date();
    console.log('date_totomorrow', date_reservation);
    var Reservations = await Reservation.find({
      reservationdate: { $gte: date_reservation },
    });
     for (const res of Reservations) {
     var user = await User.findOne({ _id: res.user });
     var Operation = await OperationService.addReservation({
         status: 'ACTIVE',
         timeslot: res.timeslot,
         user: res.user,
         manager: user.manager ? user.manager : null,
         desk: res.desk,
         reservationdate: res.reservationdate.toISOString().substring(0, 10),
         OperationType: 'RESERVATION',
       });
       console.log('Reservation reservationdate', res.reservationdate);
     }
    return Reservations;
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};



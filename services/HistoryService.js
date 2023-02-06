var FloorService = require('../services/FloorService');
var DeskService = require('../services/DeskService');
var ZoneService = require('../services/ZoneService');
var History = require('../models/History');
const { ObjectId } = require('mongodb');
var UserService = require('../services/UserService');
const User = require('../models/User');
const Floor = require('../models/Floor');

exports.getHistory = async function (query, page, limit) {
  try {
    var Historys = await History.find(query);
    return Historys;
  } catch (e) {
    throw Error('Error while Paginating Historys');
  }
};
exports.getHistoryByUserid = async function (id) {
  try {
    var querytest = { user: id };

    var content = await History.find(querytest);
    return content;
  } catch (e) {
    throw Error('Error while finding');
  }
};
// exports.getCardHistoryByUserid = async function (id) {
//   try {
//     let cardhistory = [];
//     var querytest = { user: id };

//     var content = await History.find(querytest);
//     for (const h of content) {
//       iddesk = h.Reservation.desk;
//       idzone = h.Reservation.zone;
//       deskdata = await DeskService.getDeskByid(iddesk);
//       zonedata = await ZoneService.getZoneyid(deskdata.zone);
//       floordata = await FloorService.getFlooryid(zonedata.floor);

//       cardhistory.push({
//         id: h.id,
//         Desk: deskdata.name,
//         zone: zonedata.name,
//         floor: floordata.name,
//         time: h.Reservation.reservationdate,
//         slot: h.Reservation.timeslot,
//         TransactionType: h.TransactionType,
//         updatedAt: h.updatedAt,
//       });
//     }

//     return cardhistory;
//   } catch (e) {
//     throw Error(e);
//   }
// };
exports.getCardHistoryByUserid = async function (id) {
  try {
    var today = new Date();
    today.setDate(today.getDate() + 20);
    var lastWeekDate = new Date();
    lastWeekDate.setDate(lastWeekDate.getDate() - 100);
    var querytest = {
      user: id,
      // createdAt: {
      //   $gte: lastWeekDate.toISOString().substring(0, 10),
      //   $lt: today.toISOString().substring(0, 10),
      // },
    };

    var UserHistory = await History.find(querytest)
      .populate({
        path: 'Reservation.desk',
        populate: {
          path: 'zone',
          populate: {
            path: 'floor',
          },
        },
      })
      .populate('Request.idReciever')
      .populate('WFH_Operation.idReciever');

    var cardhistory = [];
    //  console.log('UserHistory', UserHistory);

    for (const history of UserHistory) {
      // history.Reservation &&
      //   history.Reservation.desk &&
      //   console.log('history', history.Reservation.desk._id);

      if (history.Reservation && history.Reservation.desk) {
        //  console.log('historyReservation', history);

        cardhistory.push({
          id: history._id,
          Desk: history.Reservation.desk.name,
          zone: history.Reservation.desk.zone.name,
          floor: history.Reservation.desk.zone.floor.name,
          time: history.Reservation.reservationdate
            ? history.Reservation.reservationdate
            : history.Reservation.reservationdate,
          slot: history.Reservation.timeslot,
          TransactionType: history.TransactionType,
          updatedAt: history.updatedAt,
          type: 'Reservation',
        });
      } else if (history.Request && history.Request.name) {
        
        cardhistory.push({
          id: history._id,
          Manager:
            history.Request.idReciever.firstname +
            ' ' +
            history.Request.idReciever.lastname,
          status: history.Request.status,
          TransactionType: history.TransactionType,
          updatedAt: history.updatedAt,
          type: 'Request',
        });
      } else if (history.WFH_Operation && history.WFH_Operation.status) {
        cardhistory.push({
          id: history._id,
          Manager:
            history.WFH_Operation.idReciever.firstname +
            ' ' +
            history.WFH_Operation.idReciever.lastname,
          status: history.WFH_Operation.status,
          slot: history.WFH_Operation.timeslot,
          time: history.WFH_Operation.date,

          TransactionType: history.TransactionType,
          updatedAt: history.updatedAt,
          type: 'Operation',
        });
        //  console.log('history WFHHHHHHHHHHH', cardhistory);
      }
    }
    

    return cardhistory;
  } catch (e) {
    throw Error(e);
  }
};

exports.addNewHistory = async function (document) {
  try {
    
    // user = await UserService.getUserById(document.user);
    // desk = await DeskService.getDeskByid(document.Reservation.desk)
    // var zone = await ZoneService.getZoneyid(desk.zone)
    // var floor = await Floor.findById(zone.floor)

    // var u = await User.findByIdAndUpdate(document.user, user)
    var content = await History.create(document);

    // user.history.push({
    //   status: document.Reservation.status,
    //   timeslot: document.Reservation.timeslot,
    //   desk: desk.name,
    //   reservationdate: document.Reservation.reservationdate,
    //   TransactionType: document.TransactionType,
    //   zone: zone.name,
    //   floor: floor.name,
    //   updatedAt: content.updatedAt,
    //   createdAt: content.createdAt,
    //   isSystemOp:document.isSystemOp
    //  })

    //  var u = await UserService.updateUser(document.user, user)
    return content;
  } catch (e) {
    throw Error(e);
    // throw Error("Error while creating new History");
  }
};

exports.removeHistory = async function (id) {
  try {
    var content = await History.findByIdAndDelete(id);
    return content;
  } catch (e) {
    throw Error('Error while deleting');
  }
};

exports.updateHistory = async function (id, data) {
  try {
    var content = await History.findByIdAndUpdate(id, data);
    return content;
  } catch (e) {
    throw Error('Error while updating');
  }
};

// exports.getUserHistoryByDate = async function (id, start_date, end_date) {
//   try {
//     var history = await History.find({
//       createdAt: {
//         $gte: start_date,
//         $lt: end_date,
//       },
//       user: ObjectId(id),
//     });

//     return history;
//   } catch (e) {
//     console.log(e);
//     throw Error("error while getting user history by date");
//   }
// };

exports.getHistoryByDeskid = async function (id) {
  try {
    var querytest = { desk: ObjectId(id) };
    var content = await History.find(querytest);
    //console.log(content[0].desk);
    return content;
  } catch (e) {
    throw Error('Error while finding history for this desk');
  }
};

exports.getDeskHistoryByDate = async function (id, start_date, end_date) {
  try {
    let cardhistory = [];
    var querytest = { user: id };
    var content = await History.find({
      createdAt: {
        $gte: start_date,
        $lt: end_date,
      },
      'Reservation.desk': ObjectId(id),
    });

    for (const h of content) {
      iddesk = h.Reservation.desk;
      idzone = h.Reservation.zone;
      deskdata = await DeskService.getDeskByid(iddesk);
      zonedata = await ZoneService.getZoneyid(deskdata.zone);
      floordata = await FloorService.getFlooryid(zonedata.floor);
      idUser = h.user;
      userData = await UserService.getUserById(idUser);
      cardhistory.push({
        id: h.id,
        Desk: deskdata.name,
        firstname: userData.firstname,
        lastname: userData.lastname,
        zone: zonedata.name,
        floor: floordata.name,
        time: h.Reservation.reservationdate,
        slot: h.Reservation.timeslot,
        TransactionType: h.TransactionType,
        updatedAt: h.updatedAt,
      });
    }
    return cardhistory;
  } catch (e) {
    throw Error(e);
  }
  // try {
  //   var history = await History.find({
  //     createdAt: {
  //       $gte: start_date,
  //       $lt: end_date,
  //     },
  //     "Reservation.desk" : ObjectId(id),
  //   });
  //   return history;
  // } catch (e) {
  //   console.log(e);
  //   throw Error("error while getting desk history by date");
  // }
};

exports.getUserHistoryByDate = async function (id, start_date, end_date) {
  try {
    let cardhistory = [];
    var querytest = { user: ObjectId(id) };
    var content = await History.find({
      createdAt: {
        $gte: start_date,
        $lt: end_date,
      },
      user: ObjectId(id),
    });
    // console.log("conteeeeent", content)
    // debugger
    for (const h of content) {
      idDesk = h.Reservation.desk;
      idzone = h.Reservation.zone;
      deskdata = await DeskService.getDeskByid(idDesk);
      zonedata = await ZoneService.getZoneyid(deskdata.zone);
      floordata = await FloorService.getFlooryid(zonedata.floor);

      cardhistory.push({
        id: h.id,
        Desk: deskdata.name,
        zone: zonedata.name,
        floor: floordata.name,
        time: h.Reservation.reservationdate,
        slot: h.Reservation.timeslot,
        TransactionType: h.TransactionType,
        updatedAt: h.updatedAt,
      });
    }
    // console.log("caaaaaaaaard", cardhistory)
    return cardhistory;
  } catch (e) {
    throw Error(e);
  }
  // try {
  //   var history = await History.find({
  //     createdAt: {
  //       $gte: start_date,
  //       $lt: end_date,
  //     },
  //     "Reservation.desk" : ObjectId(id),
  //   });
  //   return history;
  // } catch (e) {
  //   console.log(e);
  //   throw Error("error while getting desk history by date");
  // }
};

exports.getNumberOfReservations = async function () {
  try {
    var firstMonth = new Date('2021-01-01');
    var nextmonth = new Date('2021-02-01');
    //var fm = firstMonth.toISOString().substring(0, 10);
    console.log(firstMonth);
    console.log(nextmonth);
    //var nm = nextmonth.toISOString().substring(0, 10);
    var data = [];
    for (var i = 0; i < 12; i++) {
      var history = await History.find({
        createdAt: {
          $gte: firstMonth.toISOString().substring(0, 10),
          $lt: nextmonth.toISOString().substring(0, 10),
        },
        TransactionType: { $in: ['CHECKIN', 'CANCELLATION', 'RESERVATION'] },
      });
      firstMonth.setMonth(firstMonth.getMonth() + 1);
      nextmonth.setMonth(nextmonth.getMonth() + 1);
      console.log(firstMonth, '  ', nextmonth);
      // fm = nm;
      // nextmonth.setMonth(nextmonth.getMonth() + 1);
      // nm = nextmonth.toISOString().substring(0, 10);
      data[i] = history.length;
    }
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    throw Error('error while calculating nb of reservations', e);
  }
};

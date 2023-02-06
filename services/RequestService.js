var Request = require('../models/Request');
var HistoryService = require('./HistoryService');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const NotificationService = require('./NotificationService');
const OperationService = require('./OperationService');
const Operation = require('../models/Operation');
const Balance = require('../models/Balance');
const { ObjectId } = require('mongodb');
const RequestService = require('./RequestService');
const { countDocuments } = require('../models/Operation');
const { sendNotif } = require('../socket');
const cron = require("node-cron");
const { mail_submission_validator, mail_submission_personNotif, mail_submissionRemote_validator, mail_submissionRemote_personNotif, mail_cancellation_validator, mail_rejection, mail_approval } = require('../template');
const UserService = require('./UserService');


exports.getRequestsByUser = async function (id) {
  try {
    var requests = await Request.find({
      idSender: id,
    })
      .populate({
        path: 'idReciever',
        model: 'User',
        select: { firstname: 1, lastname: 1, photo: 1, Accesses: 0 },
      })
      .populate({
        path: 'UserNotif',
        model: 'User',
        select: { firstname: 1, lastname: 1, Accesses: 0 },
      });
    return requests;
  } catch (e) {
    throw Error('Error while Paginating user requests');
  }
};

exports.getPendingRequestsByManager = async function (id) {
  try {
    var requests = await Request.find({
      status: 'pending',
      idReciever: id,
    })
      .populate({
        path: 'idSender',
        model: 'User',
        select: { firstname: 1, lastname: 1, photo: 1, Accesses: 0 },
      })
      .populate({
        path: 'UserNotif',
        model: 'User',
        select: { firstname: 1, lastname: 1, Accesses: 0 },
      });

    return requests;
  } catch (e) {
    throw Error('Error while Paginating manager pending requests');
  }
};


exports.addRequest = async function (document, user, res) {
  try {
    var validators = await UserService.getValidators()
    var receiver = validators.some( item => item._id == document.idReciever )
    if ( user.id !== document.idSender || !receiver ) {
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
    }
    var manager = await User.findById(document.idReciever);
    var userSender = await User.findById(document.idSender);
    if (document.name == 'WFH') {
      for (item of document.date) {
        var operations = await OperationService.getOperationsByUserDate(
          document.idSender,
          item.day,
          item.slot,
        );
        var reservations = await OperationService.getReservationsByUserDate(
          document.idSender,
          item.day,
          item.slot,
        );
        
        var periodestart = await Operation.find({
          OperationType: 'REMOTE_WORKING',
          user: document.idSender,
          date_debut: { $lte: new Date(item.day) },
        });
        var periodeEnd = await Operation.find({
          OperationType: 'REMOTE_WORKING',
          user: document.idSender,
          date_fin: { $gte: new Date(item.day) },
        });
        

        if (periodestart.length !== 0 && periodeEnd.length !== 0) {
          return {
            status: 201,
            message: 'You already have an remote working during this period',
          };
        }
      if (operations.length !== 0 || reservations.length !== 0) {
        return {
          status: 201,
          message:
            'You already have an operation at ' +
            item.day.split('-').reverse().join('-') +
            ' ' +
            item.slot,
        };
      }
    }
    if (
      userSender.role === 'manager' ||
      userSender.role === 'manager_validator'
    ) {
        var request = await Request.create({
        idSender: document.idSender,
        idReciever: document.idReciever,
        UserNotif: document.UserNotif,
        name: document.name,
        commentUser: document.commentUser,
        status: 'accepted',
      });
      history = await HistoryService.addNewHistory({
        Request: {
          status: 'accepted',
          id: request._id,
          idReciever: request.idReciever,
          name: request.name,
          dates: document.date,
        },
        user: request.idSender,
        TransactionType: 'WFH_SUBMISSION',
      });
    } else {
      var request = await Request.create({
        idSender: document.idSender,
        idReciever: document.idReciever,
        UserNotif: document.UserNotif,
        name: document.name,
        commentUser: document.commentUser,
      });
      history = await HistoryService.addNewHistory({
        Request: {
          status: 'pending',
          id: request._id,
          idReciever: request.idReciever,
          name: request.name,
          dates: document.date,
        },
        user: request.idSender,
        TransactionType: 'WFH_SUBMISSION',
      });
    }
    var manager = await User.findById(document.idReciever);
    var userSender = await User.findById(document.idSender);
    document.date.map(async (item) => {
      var result = await OperationService.addOperation({
        OperationType: 'WFH',
        request: request._id,
        date: item.day,
        timeslot: item.slot,
        user: document.idSender,
        manager: document.idReciever,
      });
    });
    var balance = await Balance.find({ idUser: document.idSender });
    var WFHweekBalance = balance[0].WFHweekBalance;
    var i = WFHweekBalance.findIndex((x) => x.nb == document.week);
    WFHweekBalance[i].count = document.countWeek;
    var WFHmonthBalance = balance[0].WFHmonthBalance;
    var j = WFHmonthBalance.findIndex((x) => x.nb == document.month);
    WFHmonthBalance[j].count = document.countMonth;
    if (document.monthTwo && document.monthTwo !== null) {
      var k = WFHmonthBalance.findIndex((x) => x.nb == document.monthTwo);
      WFHmonthBalance[k].count = document.countMonthTwo;
    }
    var result = await Balance.findByIdAndUpdate(
      { _id: ObjectId(balance[0]._id) },
      {
        WFHweekBalance: WFHweekBalance,
        WFHmonthBalance: WFHmonthBalance,
      },
    );
     var dateStr = "";
    for (item of document.date) {
      dateStr = dateStr + item.day + " " + item.slot + ", ";
    }
    var text = await mail_submission_validator(userSender, dateStr)
    await NotificationService.sendMail(manager, 'WFH request', text)
    const notif_message =
      'Hi ' +
      manager.firstname +
      ', ' + userSender.firstname + ' ' + userSender.lastname + ' has submitted a new WFH request.';
    await NotificationService.sendNotif(
      'WFH request',
      notif_message,
      manager.tokenDevice,
      "team"
    );
    for (user of document.UserNotif) {
      var userNotif = await User.findById(user);
      var text = await mail_submission_personNotif(userSender, dateStr)
      await NotificationService.sendMail(userNotif, 'Work from home request', text)

      const notif_message =
        'Hi ' +
        userNotif.firstname +
        ', ' +
        userSender.firstname +
        ' ' +
        userSender.lastname +
        ' has submitted a new WFH request.';
        
      await NotificationService.sendNotif(
        'WFH request',
        notif_message,
        userNotif.tokenDevice,
        '',
      );
      var notif = await NotificationService.addNotification({
        idReciever: document.idReciever,
        idSender: document.idSender,
        Request: request._id,
        Action: 'ADD',
        message:
          'Hi ' +
          manager.firstname +
          ', ' +
          userSender.firstname +
          ' ' +
          userSender.lastname +
          ' has submitted a new WFH request.',
        title: 'WFH',
      });
     }
    } else {
      for (item of document.date) {
        var operations = await Operation.find({
          user: document.idSender,
          date: item,
        });
        var reservations = await Operation.find({
          user: document.idSender,
          reservationdate: item,
        });

        if (operations.length !== 0 || reservations.length !== 0) {
          return {
            status: 201,
            message:
              'You already have an operation at ' +
              item.split('-').reverse().join('-'),
          };
        }
      }

      var periodestart = await Operation.find({
        user: document.idSender,
        date_debut: { $gte: document.start, $lte: document.end },
      });
      var periodeEnd = await Operation.find({
        user: document.idSender,
        date_fin: { $gte: document.start, $lte: document.end },
      });
      if (periodestart.length !== 0 || periodeEnd.length !== 0) {
        return {
          status: 201,
          message: 'You already have an remote working during this period',
        };
      }
      if (
        userSender.role === 'manager' ||
        userSender.role === 'manager_validator'
      ) {
        var request = await Request.create({
          idSender: document.idSender,
          idReciever: document.idReciever,
          UserNotif: document.UserNotif,
          name: document.name,
          commentUser: document.commentUser,
          status: 'accepted',
        });
        history = await HistoryService.addNewHistory({
          Request: {
            status: 'accepted',
            id: request._id,
            idReciever: request.idReciever,
            name: request.name,
            dates: document.date,
          },
          user: request.idSender,
          TransactionType: 'WFH_SUBMISSION',
        });
      } else {
        var request = await Request.create({
          idSender: document.idSender,
          idReciever: document.idReciever,
          UserNotif: document.UserNotif,
          name: document.name,
          commentUser: document.commentUser,
        });
        history = await HistoryService.addNewHistory({
          Request: {
            status: 'pending',
            id: request._id,
            idReciever: request.idReciever,
            name: request.name,
            dates: document.date,
          },
          user: request.idSender,
          TransactionType: 'WFH_SUBMISSION',
        });
      }
      var result = await OperationService.addOperation({
        OperationType: 'REMOTE_WORKING',
        request: request._id,
        date_debut: document.start,
        date_fin: document.end,
        user: document.idSender,
        manager: document.idReciever,
      });

      var text = await mail_submissionRemote_validator(userSender, document.start, document.end)

      await NotificationService.sendMail(manager, 'Remote working request', text)
      const notif_message =
        'Hi ' +
        manager.firstname +
        ', ' +
        userSender.firstname +
        ' ' +
        userSender.lastname +
        ' has submitted a new remote working request.';
      await NotificationService.sendNotif(
        'remote working',
        notif_message,
        manager.tokenDevice,
        'team',
      );
      for (user of document.UserNotif) {
        var userNotif = await User.findById(user);
        var text = await mail_submissionRemote_personNotif(userSender, document.start, document.end)
        await NotificationService.sendMail(userNotif, 'Remote working request', text)
        const notif_message =
          'Hi ' +
          userNotif.firstname +
          ', ' +
          userSender.firstname +
          ' ' +
          userSender.lastname +
          ' has submitted a new remote working request.';
        await NotificationService.sendNotif(
          'WFH request',
          notif_message,
          userNotif.tokenDevice,
          '',
        );
        var notif = await NotificationService.addNotification({
          idReciever: document.idReciever,
          idSender: document.idSender,
          Request: request._id,
          Action: 'ADD',
          message:
            'Hi ' +
            manager.firstname +
            ', ' +
            userSender.firstname +
            ' ' +
            userSender.lastname +
            ' has submitted a new remote working request.',
          title: 'WFH',
        });
      }
    }

    return {
      status: 200,
      message: 'Request added successfully',
    };
  } catch (e) {
    console.log(e);
    throw Error(e);
  }
};

exports.getRequestByID = async function (id, user, res) {
  try {
    
    var request = await Request.findById(id)
      .populate({
        path: 'idReciever',
        model: 'User',
        select: {
          firstname: 1,
          lastname: 1,
          Accesses: 0,
          Email: 1,
          tokenDevice: 1,
        },
      })
      .populate({
        path: 'idSender',
        model: 'User',
        select: {
          firstname: 1,
          lastname: 1,
          Accesses: 0,
          Email: 1,
          tokenDevice: 1,
        },
      })
      .populate({
        path: 'UserNotif',
        model: 'User',
        select: {
          firstname: 1,
          lastname: 1,
          Accesses: 0,
          Email: 1,
          tokenDevice: 1,
        },
      });

      if ( user.id == request.idSender._id || user.id == request.idReciever._id || user.admin ) {
        return request;
      } else {
        return res.status(400).json({
          status: 400,
          message: 'Not authorized',
        });
      }

  } catch (e) {
    console.log(e)
    throw Error('Error while finding request');
  }
};
exports.cancelRequest = async function (id, user, res) {
  try {
    
    var operations = await OperationService.getOperationsByRequest(id, user, res);
    var request = await Request.findById(id).populate('idReciever').populate('idSender')
    if ( user.id != request.idSender._id) {
      return res.status(400).json({
        status: 400,
        message: 'Not authorized',
      });
    }
    if (operations.length != 0) {
      if (operations[0].OperationType == 'WFH') {
        var Dates = [];
        for ( const operation of operations ) {
          Dates.push({ date: operation.date, timeslot: operation.timeslot });
          var result = await OperationService.deleteOperation(operation._id, user, res, false);
        }
        history = await HistoryService.addNewHistory({
          Request: {
            status: request.status,
            id: id,
            idReciever: request.idReciever._id,
            name: request.name,
            dates: Dates,
          },
          user: request.idSender._id,
          TransactionType: 'WFH_CANCELLATION',
        });
        var dateStr = '';
        for (item of operations) {
          dateStr = dateStr + item.date + ' ' + item.timeslot + ', ';
        }
        var text = await mail_cancellation_validator(request.idSender, dateStr);
        await NotificationService.sendMail(
          request.idReciever,
          'WFH request cancellation',
          text,
        );
        const notif_message = `${request.idSender.firstname} ${request.idSender.lastname} has cancelled a WFH request.`;
        await NotificationService.sendNotif(
          'WFH cancellation',
          notif_message,
          request.idReciever.tokenDevice,
          'team',
        );
        var notif = await NotificationService.addNotification({
          idReciever: request.idReciever,
          idSender: request.idSender,
          Request: request._id,
          Action: 'CANCEL',
          message:
            'Hi ' +
            request.idReciever.firstname +
            ', ' +
            request.idSender.firstname +
            ' ' +
            request.idSender.lastname +
            ' has cancelled a WFH request.',
          title: 'WFH',
        });
        /*
    var notif = await NotificationService.addNotification({
      idReciever: request.idReciever._id,
      idSender: request.idSender._id,
      Request: request._id,
      Action: 'CANCEL',
      message:
        'Hi ' +
        userNotif.firstname +
        ', ' +
        userSender.firstname +
        ' ' +
        userSender.lastname +
        ' has cancelled a WFH request.',
      title: 'WFH',
    });*/
    } else {
        var Dates = [];
        var result = OperationService.deleteOperation(operations[0]._id, user, res, false);
        history = await HistoryService.addNewHistory({
          Request: {
            status: request.status,
            id: id,
            idReciever: request.idReciever._id,
            name: request.name,
            dates: Dates,
          },
          user: request.idSender._id,
          TransactionType: 'WFH_CANCELLATION',
        });
        var dateStr = operations[0].date_debut + ', ';
        var text = await mail_cancellation_validator(request.idSender, dateStr);
        await NotificationService.sendMail(
          request.idReciever,
          'Remote Working request cancellation',
          text,
        );
        const notif_message = `${request.idSender.firstname} ${request.idSender.lastname} has cancelled a Remote Working request.`;
        await NotificationService.sendNotif(
          'Remote working cancellation',
          notif_message,
          request.idReciever.tokenDevice,
          'team',
        );
        var notif = await NotificationService.addNotification({
          idReciever: request.idReciever,
          idSender: request.idSender,
          Request: request._id,
          Action: 'CANCEL',
          message:
            'Hi ' +
            request.idReciever.firstname +
            ', ' +
            request.idSender.firstname +
            ' ' +
            request.idSender.lastname +
            ' has cancelled a Remote Working request.',
          title: 'Remote Working',
        });
        /*
      var notif = await NotificationService.addNotification({
        idReciever: request.idReciever._id,
        idSender: request.idSender._id,
        Request: request._id,
        Action: 'CANCEL',
        message:
          'Hi ' +
          userNotif.firstname +
          ', ' +
          userSender.firstname +
          ' ' +
          userSender.lastname +
          ' has cancelled a WFH request.',
        title: 'WFH',
      });*/
      }
    }
    var content = await Request.findByIdAndDelete(id);
    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while deleting Request');
  }
};
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

exports.updateRequest = async function (user, id, document, res) {
  try {
    const request = await RequestService.getRequestByID(id, user, res);
     var notif_message;
     var transaction = '';
     var action = '';

    if (document.status === 'accepted') {

      transaction = 'WFH_APPROVAL';
      action = 'APPROVE';
      var text = await mail_approval()
      notif_message =
        
        '   Your WFH request created at '+request.createdAt.toISOString().substring(0, 10)+' has been approved.';

       
    } else {

      var operations = await OperationService.getOperationsByRequest(id, user, res);
      var balance = await Balance.find({ idUser: request.idSender._id });
      var WFHmonthBalance = balance[0].WFHmonthBalance;
      var WFHweekBalance = balance[0].WFHweekBalance;
      
      for (operation of operations) {
        const date = new Date(operation.date);
        const month = date.getMonth() + 1;
        var j = WFHmonthBalance.findIndex((x) => x.nb == month);
        
          WFHmonthBalance[j].count = WFHmonthBalance[j].count - 0.5;
        
        var nb = getWeekNumber(date);
        var i = WFHweekBalance.findIndex((x) => x.nb == nb);
        
          WFHweekBalance[i].count = WFHweekBalance[i].count - 0.5;
        

      }
     
      var result = await Balance.findByIdAndUpdate(
        { _id: ObjectId(balance[0]._id) },
        {
          WFHmonthBalance: WFHmonthBalance,
          WFHweekBalance: WFHweekBalance,
        },
      );


      transaction = 'WFH_REJECTION';
      action = 'REJECT';
      var text = await mail_rejection(request.createdAt.toISOString().substring(0, 10))
      notif_message =
    
        '   Your WFH request created at '+request.createdAt.toISOString().substring(0, 10)+' has been rejected.';

      
       }

    var content = await Request.findByIdAndUpdate(id, document);

    history = await HistoryService.addNewHistory({
        Request: {
          status: document.status,
          id: request._id,
          idReciever: request.idReciever._id,
          name: request.name,
          dates: request.date
        },
        user: request.idSender._id,
        TransactionType: transaction,
      });

      var notif = await NotificationService.addNotification({
        idReciever: request.idSender,
        idSender: request.idReciever,
        Request: request._id,
        Action: action,
        message: notif_message,
        title: 'WFH',
       });

       await NotificationService.sendMail(request.idSender, 'WFH Request status', text)
    
      await NotificationService.sendNotif(
        'WFH status',
        notif_message,
        request.idSender.tokenDevice,
        '',
        );
    
      return content;
      
  } catch (e) {
    console.log(e);
    throw Error('Error while updating Request');
  }
};
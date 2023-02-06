var admin = require("firebase-admin");
const Reservation = require("../models/Operation");
const Notification = require("../models/Notification");

const HistoryService= require("./HistoryService")
var UserService = require("./UserService");
const cron = require("node-cron");
const availabilityService = require("./AvailabilityService")
var DeskService = require("./DeskService");
// const { ids } = require('./app');
const nodemailer = require('nodemailer');
var serviceAccount = require("../workpointServiceFirebase.json");
const { sendData } = require('../socket');
const notificationServiice = require('./NotificationService')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// cron.schedule("10 11 * * *",async function(){
   
//     try {
//       var message;
//       console.log("check-in didn't happen, ending reservation");
//       var ND= new Date();
//       ND.setDate(ND.getDate());
//       var Reservations = await Reservation.find({timeslot:"AM",reservationdate:ND.toISOString().substring(0,10),status:"ACTIVE"}).populate('desk').populate('user');
        
//       for (const reservation of Reservations)
//       {
//         console.log('ressource', reservation.desk.name)
//         if (reservation.desk.name.charAt(0) !== "-" ) {
//           console.log('desssssk', reservation.desk.name)
//         history = await HistoryService.addNewHistory({
//         Reservation: {
//             status: "CANCELLED",
//             timeslot: reservation.timeslot,
//             desk: reservation.desk._id,
//             reservationdate: reservation.reservationdate,
//         },
//         isSystemOp:true,
//         TransactionType: "CANCELLATION",
//         user: reservation.user._id,
//         });
    
//         reservation.user.reservations = await reservation.user.reservations.filter(item => item.id != reservation.id )
  
//         var u = await UserService.updateUser(reservation.user._id, {
//             "reservations" : reservation.user.reservations
//         } )
//         var reservationdate= reservation.reservationdate.toISOString().substring(0,10);
//         var status="AVAILABLE";
//         var m = await  availabilityService.updateavailabilityDesk(reservationdate, reservation.desk.zone.toString(),reservation.timeslot.toString(),"",reservation.desk._id.toString(),status);
//         await Reservation.findByIdAndDelete(reservation.id);
        
//         // if  (reservation.user.tokenDevice ) {  
//         //     const notif_message = "Hi "+ reservation.user.firstname+", please be notified that your reservation has been canceled.";
//         //     const title = "Reservation cancelation"
//         //     const tokenDevice = reservation.user.tokenDevice
//         //     await notificationServiice.sendNotif(title, notif_message, tokenDevice)
        
//         // }
//       }
//     }
      
//     } catch (e) {
//       throw Error(e);
//     }
//   });
exports.sendNotif = async (title, message,screen ,tokenDevice) => {
    console.log("token", tokenDevice)
    try{
        const payload = {
            notification: {
                
                title: title,
                body: message,
                sound: 'default',
                icon:"assets/images/work.png" ,
                clickAction: 'FLUTTER_NOTIFICATION_CLICK' 
            },
            data: {
                showForegroundNotification: 'false',
                screen: screen
            },
            // android: {
            //     notification: {
            //         clickAction: 'FLUTTER_NOTIFICATION_CLICK',
            //     },
            // }
        }; 
        // console.log(user.tokenDevice.toString());
        admin.messaging().sendToDevice(tokenDevice, payload)
        .then(function(response) {
            console.log("Successfully sent message:");
        })
        .catch(function(error) {
            console.log(error);
        });
    } catch (e) {
        console.log(e)
    }
   
    
   
 
}
// cron.schedule("09 13 * * *",async function(){
 
//         try {
//           console.log(" please don't forget 9h");
//           var Reservations = await Reservation.find({timeslot:"AM",reservationdate:new Date().toISOString().substring(0,10),status:"ACTIVE"}).populate('desk').populate('user');
//           for (const reservation of Reservations)
//           {
//             history = await HistoryService.addNewHistory({
//             Reservation: {
//                 status: "CANCELLED",
//                 timeslot: reservation.timeslot,
//                 desk: reservation.desk._id,
//                 reservationdate: reservation.reservationdate,
//             },
//             isSystemOp:true,
//             TransactionType: "CANCELLATION",
//             user: reservation.user._id,
//             });
    
//             console.log("before", reservation.user.reservations);
        
//             reservation.user.reservations = await reservation.user.reservations.filter(item => item.id != reservation.id )
//             console.log("after", reservation.user.reservations);
      
//             var u = await UserService.updateUser(reservation.user._id, {
//                 "reservations" : reservation.user.reservations
//             } )
//             var reservationdate= reservation.reservationdate.toISOString().substring(0,10);
//             var status="AVAILABLE";
//             var m = await  availabilityService.updateavailabilityDesk(reservationdate, reservation.desk.zone.toString(),reservation.timeslot.toString(),"",reservation.desk._id.toString(),status);
//             await Reservation.findByIdAndDelete(reservation.id);
//           }
      
          
//         } catch (e) {
//             console.log(e)
//           throw Error(e);
//         }
//       });

exports.addNotification =async(document)=>{
    try {

        var content = await Notification.create(document);
        return content;
      } catch (e) {
        throw Error(e);
        // throw Error("Error while creating new History");
      }
}

exports.getNotificationByUser =async(user)=>{
    try {
        var content = await Notification.find({idReciever:user}).populate({
            path: 'idSender',
          // match: { "idReciever":ObjectId(id)},
           // select: 'status',
          //  options: { limit: 5 }
        });
        return content;
      } catch (e) {
        throw Error(e);
        // throw Error("Error while creating new History");
      }
}
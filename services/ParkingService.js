const cron = require("node-cron");
const Parking = require("../models/Parking");
const axios = require('axios')
const ParkingService = require('./ParkingService')



//clean parking collection every day
cron.schedule("00 23 * * *",async function(){
  
    try {
        
        await Parking.deleteMany({}, function(err) {});
    }
    catch (e) {
        throw Error(e);
    }
});

// //clean access in MS Til
// cron.schedule("15 23 * * *",async function(){
  
//     try {
        
//         const reservations = await Parking.find();
//         var access = []
//         for ( item of reservations ) {
//             access = access.concat(item.access)
//         }
//         await axios.post(`${process.env.SERVER_PARKING}/deleteParkingAccess/`,
//           { 
//           "access": access,

//           }).then(async (response) => { 
//               console.log('status', response.status)
//           }).catch ( error => {
//               console.log(error)
//           })
//     }
//     catch (e) {
//         throw Error(e);
//     }
// });

// Check In cron 
// cron.schedule('* */15 * * * *', async function() {
  
//     try {
//         console.log('running every 15 seconds');
//         const today = new Date().toISOString().substring(0,10);
//         var d = new Date();
//         var hour = d.getHours();
//         // if (hour < 13) {
//         //   var Reservations = await Parking.find({timeslot: "AM"});
//         // } else {
//           var Reservations = await Parking.find({timeslot: "PM"});
//         // }
//         //var Reservations = await Parking.find();
//          console.log("reservations ", Reservations)
        
//          await axios.post(`${process.env.SERVER_PARKING}/checkInCheckOut/`, {'Reservations': Reservations, 'date': today}
//          ).then(async (response) => { 
//              console.log('status', response.status)
//          }).catch ( error => {
//              console.log(error)
//          })
//       } catch (e) {
//         console.log(e)
//         //throw Error(e);
//       }
     
// });



exports.sendParkingNotif = async (tokenDevice, idParking) => {
            console.log("token", tokenDevice)
            console.log('idParking', idParking)
            const data ={
              "to" : tokenDevice,
            //   "mutable_content" : true,
              "data" : {
                  "content": {
                      id: 10,
                      channelKey: "basic_channel",
                      title: "Parking Notification",
                      body: "Do you want to free your parking spot?",
                    //   ticker: idParking
                      payload: {
                          id: idParking
                      }
                    //   "showWhen": true,
                    //   "autoCancel": true,
                    //   "privacy": "Private",
                    //   idParking: idParking
                  },
                 
                  "actionButtons": [
                      {
                          "key": "REPLY",
                          "label": "Yes",
                      },
                      {
                          "key": "ARCHIVE",
                          "label": "No",
                      }
                  ],
              }
            }
              axios.post("https://fcm.googleapis.com/fcm/send", 
              data,
              {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization":"key=AAAAIVncgxw:APA91bGLIkeiEPw6odP2Wf1x6EJcjN0WAw_Na_c0e7OpNBrLKTpSSiMMG-egZ9xP8I3D7L2YX0831aZqThXGSdwmg3l0Fwolm_l9cm9fYDqLo3k8HO4mKhMmIGyHjO3sxXOAKoyGQynL"
                }
              }
              )
              .then((response) => {
            
                console.log("heeeeeeyyyyyy")
            
              })
              .catch((error) => {
                console.log(error)
              })
         
}

exports.updateParking = async (id) => {
  try {
      console.log('update parking', id)
      var result = await Parking.findByIdAndUpdate(id, {isNotified: true, status: "ACTIVE"})
      return result
  } catch (e) {
      throw Error(e)
  }
}


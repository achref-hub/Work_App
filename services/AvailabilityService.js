const cron = require("node-cron");
var Availibality = require("../models/Availability");
var ZoneService = require("../services/ZoneService");
var DeskService = require("../services/DeskService");
var User = require("../models/User");

var Zone = require("../models/Zone");
const { ObjectId } = require("mongodb");
const Desk = require("../models/Desk");
const Availability = require("../models/Availability");
const app = require('express')();
const http = require('http').Server(app);


const { sendData } = require('../socket');


cron.schedule("17 00 * * *",async function(){
  try {
      var zones = await Zone.find();
      var ND= new Date();
     ND.setDate(ND.getDate());
     const datenow = ND.getTime();
     var NextDay= ND.toISOString().substring(0,10);
     var LD = new Date();
     LD.setDate(LD.getDate()-1);
     var Lastday= LD.toISOString().substring(0,10);
     Availibality.deleteMany({ date: Lastday,}, function(err) {});
      for (const z of zones) {
       var desks =  await ZoneService.getDesksinZone(z.id);
       let desksavailability = [];
       for (const d of desks) {
         if (d.type == "desk") {
   if (!d.isBlocked) {
    Availibality.create(
      {
       date:NextDay,
       Desk:d._id,
       statusAM:"AVAILABLE",
       statusPM: "AVAILABLE",
       UserAM:null,
       UserPM:null,
       Floor: z.floor
         }
   );
/////////////
   }
   else{
     if(new Date (d.startFreeDate).getTime()<datenow && new Date (d.endFreeDate).getTime()>datenow ){
      Availibality.create(
        {
         date:NextDay,
         Desk:d._id,
         statusAM:"AVAILABLE",
         statusPM: "AVAILABLE",
         UserAM:null,
         UserPM:null,
         Floor: z.floor
           }
     );
/////////////
///////
     }
     else{
      Availibality.create(
        {
         date:NextDay,
         Desk:d._id,
         statusAM:"BLOCKED",
         statusPM: "BLOCKED",
         UserAM:null,
         UserPM:null,
         Floor: z.floor
           }
     );
/////////////
/////////////////
     }
}
console.log("ok");
       }
       }
   }
    } catch (e) {
      throw Error(e);
    }
  });





      exports.getDeskAvailability = async function (id,dateNow) 
      {
        try {
          var desk = await DeskService.getDeskByQRCode(id);
          // var desk = await DeskService.getDeskByid(id);
          console.log("Desk ",desk);
          console.log("Zone "+ desk[0].zone);


            var querytest = {date: dateNow,Zone:desk[0].zone};

          var DR = await Availibality.find(querytest);

          console.log("DR",DR.Desks);

          let DeskAV=[]
          for (D of DR[0].Desks)
          {
            if (D.id==desk[0]._id)
            {
              DeskAV.push(
                D
              );
             
            }

          }
          return DeskAV;
        } catch (e) {
          throw Error(e);
        }
      };
      exports.updateavailabilityDesk = async function (dateee, zoneee,timesloot,user,deskid,status)
       {
        try {
          if (user.length != "" )  {
            var userInformation = await User.findById(user).select({ "firstname": 1, "_id": 1, "lastname": 1, "Accesses" :0});
          } else {
            var userInformation = "";
          }
                if(timesloot=="AM")
                {
                  var x=  await Availibality.updateOne
                  (
                    {
                      date: dateee,
                      Zone:zoneee,
                      Desks: { $elemMatch: { id: deskid} }
                    },
                    {
                       $set: { "Desks.$.statusAM" : status ,"Desks.$.userAM" : userInformation}
                     }
                  )
                }
                else{
                  var x=  await Availibality.updateOne
                  (
                    {
                      date: dateee,
                      Zone:zoneee,
                      Desks: { $elemMatch: { id: deskid} }
                    },
                    { 
                      $set: { "Desks.$.statusPM" : status,"Desks.$.userPM" : userInformation } 
                    }
                  )
                }
          //sendData('change_data');
          sendData('change_data_F0');
          sendData('change_data_F5');
          sendData('change_data_F6');
          sendData('change_data_F7');
          sendData('change_data_F8');
          sendData('change_data_F9');
          sendData('change_data_F10');
          sendData('change_data_P1');
          sendData('change_data_P2');
          sendData('change_data_touch_screen_F0')
          sendData('change_data_touch_screen_F5')
          sendData('change_data_touch_screen_F6')
          sendData('change_data_touch_screen_F7')
          sendData('change_data_touch_screen_F8')
          sendData('change_data_touch_screen_F9')
          sendData('change_data_touch_screen_F10')
          sendData('change_data_touch_screen_P_1')
          sendData('change_data_touch_screen_P_2')
          return x;
        } catch (e) {
          throw Error(e);
        }
      };
      
     

      exports.UpdatedAvailibilityParking = async function (data) {
        //console.log('data', typeof data.status)
              try {
                var update = {};
 
                  update.statusAM = "AVAILABLE"
                  update.statusPM = "AVAILABLE"
              
                //console.log('update.statusAM', update.statusAM);
          
                var start = new Date(data.startDate);
                var end = new Date(data.EndDate);
                start.setDate(start.getDate() + 1);
                end.setDate(end.getDate() + 1);
              //  date_totomorrow.setDate(date_totomorrow.getDate() + 1);
                  var content =  await Availibality.updateMany
                          (
                          {
                          Desks: { $elemMatch: { id: data.id} },
                        date: {$gte: start.toISOString().substring(0, 10),
                          $lte:end.toISOString().substring(0, 10)
                       }},
                          { 
                          $set: { "Desks.$.statusAM" : update.statusAM,"Desks.$.statusPM" : update.statusPM } 
                          }
                          )


                          var update={startFreeDate:start.toISOString().substring(0, 10),
                            endFreeDate:end.toISOString().substring(0, 10),
}
          var d = await Desk.findOneAndUpdate({_id: data.id}, update);

                        


return content;

              } catch (e) {
                console.log(e)
                throw Error("Error while updating");
              }
            };


            exports.updateAvailibility = async function (data) {
              try {
                var update = {};
                if (data.status == true){
                  update.statusAM = "BLOCKED"
                  update.statusPM = "BLOCKED"
                } else {
                  update.statusAM = "AVAILABLE"
                  update.statusPM = "AVAILABLE"
                }
                var content =  await Availibality.updateOne
                  (
                    {
                      Desks: { $elemMatch: { id: data.id} }
                    },
                    { 
                      $set: { "Desks.$.statusAM" : update.statusAM,"Desks.$.statusPM" : update.statusPM } 
                    }
                  )
                //var content = await Availability.findOneAndUpdate({id: data.id}, update);
                //content.save();
                return content;
              } catch (e) {
                throw Error("Error while updating");
              }
            };
            

            exports.CancelFreeParking = async function (id) {
              //console.log('data', typeof data.status)
                    try {
                      var update = {};
       
                        update.statusAM = "BLOCKED"
                        update.statusPM = "BLOCKED"
                    
                      var desk = await DeskService.getDeskByid(id);
                  console.log('desk', desk);

                    //  date_totomorrow.setDate(date_totomorrow.getDate() + 1);
                        var content =  await Availibality.updateMany
                                (
                                {
                                Desks: { $elemMatch: { id: id} },
                              date: {$gte: desk.startFreeDate.toISOString().substring(0, 10),
                                  $lte:desk.endFreeDate.toISOString().substring(0, 10)
                             }},
                                { 
                                $set: { "Desks.$.statusAM" : update.statusAM,"Desks.$.statusPM" : update.statusPM } 
                                }
                                )
      
      
                                var update={startFreeDate:null,
                                  endFreeDate:null,
      }
                var d = await Desk.findOneAndUpdate({_id: id}, update);
      
                                       //         console.log('update.statusAM', content);
      
      
      return content;
      
                    } catch (e) {
                      console.log(e)
                      throw Error("Error while updating");
                    }
                  };
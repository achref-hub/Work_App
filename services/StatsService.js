const History = require("../models/History");
const { ObjectId } = require("mongodb");
const User = require("../models/User");
const ServiceLine = require("../models/ServiceLine");
const StatSL = require("../models/StatSL");
const UserStat = require("../models/UserStat");
const cron = require("node-cron");
const UserStatWeekly = require("../models/UserStatWeekly");
const UserStatMonthly = require("../models/UserStatMonthly");
const StatsService = require("./StatsService");
const uri =
  process.env.MONGODB_URI ||
  `mongodb://localhost/please-set-process-env-mongodb-uri`;
const db = require("monk")(uri);
const collection_UserStatMonth = db.get("userstatmonthlies");

const StatsRessourceD = require('../models/StatsRessourceD')
const StatsRessourceW = require('../models/StatsRessourceW')
const StatsRessourceM = require('../models/StatsRessourceM');
const DailyOperation = require("../models/DailyOperation");

// const ServiceLine = require("../models/ServiceLine");
// var statistics = require("../models/statistics");
// const User = require("../models/User");
// const ServiceLineService = require("./ServiceLineService")

// const StatsRessourceMonth = require("../models/StatsRessourceM");
// const StatsRessourceW = require("../models/StatsRessourceW");
// const StatsRessourceD = require("../models/StatsRessourceD");
// exports.getTotalStats = async function (query, page, limit) {
//   try {
//     var date = new Date()
//     var year = date.getFullYear()
//     var content = await statistics.find({
//       year: year
//     });
//     return content;
//   } catch (e) {
//     throw Error("Error while Paginating stats");
//   }
// };


// // exports.getSLStats = async function (query, page, limit) {
// //   try {

// //       var sls = await ServiceLine.find()
// //       var data = []
// //       const dataSLs = []
 
// //       for (const sl of sls) {
// //         var reservations = []
// //         var cancellations = []
// //         var checkinsUser = []
// //         var checkinsSystem = []
        
// //         var users = await ServiceLineService.getUsersSl(sl._id)
// //         // data.push({
// //         //   sl: sl.serviceLine,
// //         //   users: users
// //         // })
// //         console.log(sl.serviceLine)
        
// //           var firstMonth = new Date("2021-01-01");
// //           var nextmonth = new Date("2021-02-01");
// //           for( let i = 0; i < 12; i++) {
// //             var nbReservations = 0
// //             var nbCancellations = 0
// //             var nbCheckinsUser = 0
// //             var nbCheckinsSystem = 0
            
// //             for (user of users) {
            
// //             var historyReservations = await History.find({
// //               createdAt: {
// //                 $gte: firstMonth.toISOString().substring(0, 10),
// //                 $lt: nextmonth.toISOString().substring(0, 10),
// //               },
                
// //               TransactionType:  "RESERVATION",
// //               user: user._id
            
// //             });

// //             var historyCancellations = await History.find({
// //               createdAt: {
// //                 $gte: firstMonth.toISOString().substring(0, 10),
// //                 $lt: nextmonth.toISOString().substring(0, 10),
// //               },
                
// //               TransactionType:  "CANCELLATION",
// //               user: user._id
            
// //             });

// //             var historyCheckinsUser = await History.find({
// //               createdAt: {
// //                 $gte: firstMonth.toISOString().substring(0, 10),
// //                 $lt: nextmonth.toISOString().substring(0, 10),
// //               },
                
// //               TransactionType:  "CHECKIN",
// //               isSystemOp: false,
// //               user: user._id
            
// //             });

// //             var historyCheckinsSystem = await History.find({
// //               createdAt: {
// //                 $gte: firstMonth.toISOString().substring(0, 10),
// //                 $lt: nextmonth.toISOString().substring(0, 10),
// //               },
                
// //               TransactionType:  "CANCELLATION",
// //               isSystemOp: true,
// //               user: user._id
            
// //             });
            
// //             nbReservations = nbReservations + historyReservations.length
// //             nbCancellations = nbCancellations + historyCancellations.length
// //             nbCheckinsUser = nbCheckinsUser + historyCheckinsUser.length
// //             nbCheckinsSystem = nbCheckinsSystem + historyCheckinsSystem.length
// //             //console.log(user, " ", historyReservations.length, " ", firstMonth.toISOString().substring(0, 10))
            
            
// //             }
// //             reservations.push(nbReservations)
// //             cancellations.push(nbCancellations)
// //             checkinsUser.push(nbCheckinsUser)
// //             checkinsSystem.push(nbCheckinsSystem)

// //             firstMonth.setMonth(firstMonth.getMonth() + 1);
// //             nextmonth.setMonth(nextmonth.getMonth() + 1);
          
         
// //           }
// //             data.push({
// //               sl: sl.serviceLine,
// //               reservations: reservations,
// //               cancellations: cancellations,
// //               checkinsUser: checkinsUser,
// //               checkinsSystem: checkinsSystem
// //             })


// //       }


 

      
// //       // for (var i = 0; i < 12; i++) {
// //       //   console.log("date", firstMonth.toISOString().substring(0, 10))
// //       //   var nb = 0
// //       //   var reservations = []
// //       //   for (const item of data) {
// //       //     for (const user of item.users) {
// //       //       var historyReservations = await History.find({
// //       //         createdAt: {
// //       //           $gte: firstMonth.toISOString().substring(0, 10),
// //       //           $lt: nextmonth.toISOString().substring(0, 10),
// //       //         },
        
// //       //         TransactionType:  "RESERVATION",
// //       //         user: user._id
    
// //       //       });
// //       //       nb = nb + historyReservations.length
// //       //     }
// //       //     console.log(item.sl)
// //       //     console.log(nb)
// //       //     reservations[i] = nb

// //       //   }
        
        

       
        
// //       //   firstMonth.setMonth(firstMonth.getMonth() + 1);
// //       //   nextmonth.setMonth(nextmonth.getMonth() + 1);
// //       // }
      
// // /* ******************************************************************* */
// //      //  for (const item of data) {
    
        
// //       //   for (var i = 0; i < 12; i++) { 
// //       //     console.log("first", firstMonth)
// //       //     console.log("next", nextmonth)
// //       //     var nb = 0
// //       //     for (const user of item.users) {
             
          
// //             // var historyReservations = await History.find({
// //             //     createdAt: {
// //             //       $gte: firstMonth.toISOString().substring(0, 10),
// //             //       $lt: nextmonth.toISOString().substring(0, 10),
// //             //     },
// //                 // "Reservation.reservationdate": {
// //                 //     $gte: firstMonth.toISOString().substring(0, 10),
// //                 //     $lt: nextmonth.toISOString().substring(0, 10),
// //                 // },
// //           //        TransactionType:  "RESERVATION",
// //           //        user: user._id
  
// //           //      });

// //           //       console.log("hist", historyReservations.length)
// //           //       nb = nb + historyReservations.length
             
// //           // }
// //           //console.log("nb", nb)
// //       //     reservations[i] = nb;
// //         //    firstMonth.setMonth(firstMonth.getMonth() + 1);
// //         //    nextmonth.setMonth(nextmonth.getMonth() + 1);
             
             
// //         //  }

            
// //       //         dataSLs.push({
// //       //           sl: item.sl,
// //       //           reservations: reservations

// //       //         })

        
// //       //  }




// //     // var firstMonth = new Date("2021-01-01");
// //     // var nextmonth = new Date("2021-02-01");
// //     // var historyReservations = await History.find({
// //     //   createdAt: {
// //     //     $gte: firstMonth.toISOString().substring(0, 10),
// //     //     $lt: nextmonth.toISOString().substring(0, 10),
// //     //   },
// //     //   TransactionType:  "RESERVATION",
// //     // });

// //     // for (const h of historyReservations) {
// //     //   var user = await User.findById(h.user)
// //     // }

// //     return data;
// //   } catch (e) {
// //     // throw Error("Error while Paginating stats");
// //     console.log(e)
// //   }
// // };


// exports.getSLStats = async function (firstMonth, nextMonth, index, slData) {
//   try {


//       var sls = await ServiceLine.find()
//       var data = []
//       const dataSLs = []

 
//       for (const sl of sls) {
//         // var reservations = []
//         // var cancellations = []
//         // var checkinsUser = []
//         // var checkinsSystem = []
//         var nbReservations = 0
//         var nbCancellations = 0
//         var nbCheckinsUser = 0
//         var nbCheckinsSystem = 0
        
//         var users = await ServiceLineService.getUsersSl(sl._id)
 
//         console.log(sl.serviceLine)
//         for (user of users) {
            
//             var historyReservations = await History.find({
//               createdAt: {
//                 $gte: firstMonth.toISOString().substring(0, 10),
//                 $lt: nextMonth.toISOString().substring(0, 10),
//               },
                
//               TransactionType:  "RESERVATION",
//               user: user._id
            
//             });

//             var historyCancellations = await History.find({
//               createdAt: {
//                 $gte: firstMonth.toISOString().substring(0, 10),
//                 $lt: nextMonth.toISOString().substring(0, 10),
//               },
                
//               TransactionType:  "CANCELLATION",
//               user: user._id
            
//             });

//             var historyCheckinsUser = await History.find({
//               createdAt: {
//                 $gte: firstMonth.toISOString().substring(0, 10),
//                 $lt: nextMonth.toISOString().substring(0, 10),
//               },
                
//               TransactionType:  "CHECKIN",
//               isSystemOp: false,
//               user: user._id
            
//             });

//             var historyCheckinsSystem = await History.find({
//               createdAt: {
//                 $gte: firstMonth.toISOString().substring(0, 10),
//                 $lt: nextMonth.toISOString().substring(0, 10),
//               },
                
//               TransactionType:  "CANCELLATION",
//               isSystemOp: true,
//               user: user._id
            
//             });
            
//             nbReservations = nbReservations + historyReservations.length
//             nbCancellations = nbCancellations + historyCancellations.length
//             nbCheckinsUser = nbCheckinsUser + historyCheckinsUser.length
//             nbCheckinsSystem = nbCheckinsSystem + historyCheckinsSystem.length
//             //console.log(user, " ", historyReservations.length, " ", firstMonth.toISOString().substring(0, 10))
            
            
//             }
//             slData[0].reservations[index] = nbReservations
//             slData[0].cancellations[index] = nbCancellations
//             slData[0].checkinsUser[index] = nbCheckinsUser
//             slData[0].checkinsSystem[index] =nbCheckinsSystem

         
          
//             data.push({
//               sl: sl.serviceLine,
//               reservations: slData[0].reservations,
//               cancellations: slData[0].cancellations,
//               checkinsUser: slData[0].checkinsUser,
//               checkinsSystem: slData[0].checkinsSystem
//             })


//       }


//     return data;
//   } catch (e) {
//     // throw Error("Error while Paginating stats");
//     console.log(e)
//   }
// };



// exports.getWeekStats = async function ( start, end ) {
//   try {


//     var content = await StatsRessourceW.find({
//       startDate: start,
//       endDate: end

//     });
//     return content;
//   } catch (e) {
//     throw Error("Error while Paginating stats");
//   }
// };

// exports.getMonthStats = async function ( start_date) {
//   try {
        
//     var content = await StatsRessourceMonth.find({
//       month: start_date
//     });
//     return content;
//   } catch (e) {
//     throw Error("Error while Paginating stats");
//   }
// };


// exports.getSayStats = async function ( date ) {
//   try {
        
//     var content = await StatsRessourceD.find({
//       date: date
//     });
//     return content;
//   } catch (e) {
//     throw Error("Error while Paginating stats");
//   }
// };

// exports.getAllStats = async function () {
//   try {
//     var tab=[];
//   var firstMonth = new Date("2021-01-01");
//   var nextmonth = new Date("2021-02-01");
//   for (var i = 0; i < 12; i++) {
//    var historyData= await History.aggregate(
//      [
//     {
//       $match:{
//         //TransactionType:"RESERVATION",
//       createdAt: {$gte: firstMonth, $lt:nextmonth},
//       isSystemOp: false
//    }
//   }
//    ,
//     {
//         $group:{_id:"$TransactionType"
//         , total: { $sum: 1 }
//       }}
//     ]);
// //   var historyData= await History.aggregate(
// //     [
// //    {
// //      $match:{createdAt: {$gte: firstMonth, $lt:nextmonth}
// //   }
// //  }
// //   ,
// //    {
// //        $group:{_id:"$TransactionType"
// //        , total: { $sum: 1 }}
// //      }
// //    ]);
//   await tab.push(historyData);
// // console.log(nextmonth)
//   firstMonth.setMonth(firstMonth.getMonth() + 1);
//   nextmonth.setMonth(nextmonth.getMonth() + 1);
//   }
//   console.log(historyData)
//     return tab;
//   } catch (e) {
//     console.log(e);
//     throw Error("error while calculating nb of reservations", e);
//   }
// }


exports.getAllStats = async function () {
  try {
  var tab=[];
  var firstMonth = new Date("2021-01-01");
  var nextmonth = new Date("2021-02-01");
  for (var i = 0; i < 12; i++) {
   var historyData= await History.aggregate(
     [
    {
      $match:{
      createdAt: {$gte: firstMonth, $lt:nextmonth},
      isSystemOp: false
   }
  }
   ,
    {
        $group:{_id:"$TransactionType"
        , total: { $sum: 1 }
      }}
    ]);

  await tab.push(historyData);
  firstMonth.setMonth(firstMonth.getMonth() + 1);
  nextmonth.setMonth(nextmonth.getMonth() + 1);
  }
    const data = await StatSL.create({
      totalOperations: tab,
    }); 
  } catch (e) {
    console.log(e);
    throw Error("error while calculating all stats", e);
  }
}

exports.getSystemCancel = async function () {
  try {
    var tab=[];
  var firstMonth = new Date("2021-01-01");
  var nextmonth = new Date("2021-02-01");
  for (var i = 0; i < 12; i++) {
    var historyData = await History.count({
        createdAt:{$gte: firstMonth, $lt:nextmonth},
        TransactionType: "CANCELLATION",
        isSystemOp: true
      });
  await tab.push(historyData);
// console.log(nextmonth)
  firstMonth.setMonth(firstMonth.getMonth() + 1);
  nextmonth.setMonth(nextmonth.getMonth() + 1);
  }
  console.log(historyData)
    return tab;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}

exports.getSLOperations = async function (res) {
  try {
    var firstMonth = new Date("2021-01-01");
    var nextMonth = new Date("2021-01-01");
    var today = new Date()
    firstMonth.setMonth(today.getMonth())
    firstMonth.setFullYear(today.getFullYear())
    nextMonth.setMonth(today.getMonth()+1)
    nextMonth.setFullYear(today.getFullYear())
      History.aggregate([
          {
            $match:{
            //TransactionType:"RESERVATION",
            createdAt: {$gte: firstMonth, $lt:nextMonth},
            isSystemOp: false
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
            $group:{_id:"$userData.serviceLine"
              , total: { $sum: 1 }
            }
          },
      ]
        ).exec((err, items)=>{
                const results = items.filter(item =>  item._id.length !== 0 )
                ServiceLine.populate(results, {path: '_id'}, function(err, populatedResult) {
                  // console.log("populatedResult", populatedResult)
                  // results = populatedResult
                  // console.log("result", results)
                  return res.json({
                    success: true,
                    data: populatedResult,
                    message: "Success",
                  });
              });
            })
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}
exports.getSLReservations = async function (res) {
  try {
    var firstMonth = new Date("2021-01-01");
    var nextMonth = new Date("2021-01-01");
    var today = new Date()
    firstMonth.setMonth(today.getMonth())
    firstMonth.setFullYear(today.getFullYear())
    nextMonth.setMonth(today.getMonth()+1)
    nextMonth.setFullYear(today.getFullYear())
      History.aggregate([
          {
            $match:{
            TransactionType:"RESERVATION",
            createdAt: {$gte: firstMonth, $lt:nextMonth},
            isSystemOp: false
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
            $group:{_id:"$userData.serviceLine"
              , total: { $sum: 1 }
            }
          },
      ]
        ).exec((err, items)=>{
                // console.log("iteeems", items)
                const results = items.filter(item =>  item._id.length !== 0 )
                ServiceLine.populate(results, {path: '_id'}, function(err, populatedResult) {
                  // console.log("populatedResult", populatedResult)
                  // results = populatedResult
                  return res.json({
                    success: true,
                    data: populatedResult,
                    message: "Success",
                  });
              });
            })
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}





async function pushData (tab, item) {
  tab.push(item)
  console.log("taaab", tab)
}


exports.getSLReservation = async function  (res) {
  try {
    var data = []
    var firstMonth = new Date("2021-10-01");
    var nextmonth = new Date("2021-11-01");
      History.aggregate([

          { 
            $match:{
              TransactionType:"RESERVATION",
              createdAt: {$gte: firstMonth, $lt:nextmonth},
              // isSystemOp: false
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
            $group:{_id:"$userData.serviceLine"
              , total: { $sum: 1 }
            }
            
          },
        
      ]
        , async function (err, items)  {
                await ServiceLine.populate(items, {path: '_id'}, async function(err, populatedResult) {
                  results = populatedResult
                  
                  //return Promise.resolve(results);
                   for ( const sl of results ) {
                     console.log(sl)
                
                     var content = await StatSL.findOneAndUpdate({slName: sl._id.serviceLine}, { $push: { dataRaservations: sl.total } });
                    //  const content = StatSL.create({
                    //    slName: sl._id.serviceLine,
                    //    dataRaservations:  sl.total, 
                    //  })


                   }
                 
                  return  res.json({
                    success: true,
                    data: results,
                    message: "Success",
                  });
              });
              
             
            })
    
         



          
        

  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}

exports.saveSLReservations = async function (res) {
  const sls = await getSLReservation(res)
  console.log("taaab", sls)
}



// exports.getSLReservation = async function (res) {
//   try {
//    // var history = await History.find({ user: ObjectId('615710a16c48c59c424ccd50') })
// //     var tab=[];
//     // var nextmonth = new Date();
//     // var firstMonth = new Date()

//     // firstMonth.setMonth(nextmonth.getMonth() - 1)
//     // firstMonth.setDate(01)
//     // nextmonth.setDate(01)
//     var firstMonth = new Date("2021-10-01");
//     var nextmonth = new Date("2021-11-01");
//   // for (var i = 0; i < 12; i++) {
//   History.aggregate([

//     { 
//       $match:{
//       // TransactionType:"RESERVATION",
//       createdAt: {$gte: firstMonth, $lt:nextmonth},
//       isSystemOp: false
//       }
//     },
//     {
//         $lookup: {
//             from: 'users',
//             localField: 'user',
//             foreignField: '_id',
//             as: 'userData'
//         }
//     },
//     {
//       $group:{_id:"$userData.serviceLine"
//         , total: { $sum: 1 }
//       }
      
//     },
  
// ]
//   ).exec((err, items)=>{
//           console.log("iteeems", items)
//           ServiceLine.populate(items, {path: '_id'}, function(err, populatedResult) {
//             // console.log("populatedResult", populatedResult)
//             results = populatedResult
//             console.log("result", results)
          
//             return res.json({
//               success: true,
//               data: results,
//               message: "Success",
//             });
//         });
//       })
//       // console.log("result 22222222222", results)

      
    

// //   await tab.push(historyData);
// // // console.log(nextmonth)
//   firstMonth.setMonth(firstMonth.getMonth() + 1);
//   nextmonth.setMonth(nextmonth.getMonth() + 1);
//   // }
// //   console.log(historyData)
//     // return historyData;
//   } catch (e) {
//     console.log(e);
//     throw Error("error while calculating nb of reservations", e);
//   }
// }


exports.getSLCancelUser = async function (res) {
  try {
    var results = []

    // var nextmonth = new Date();
    // var firstMonth = new Date()

    // firstMonth.setMonth(nextmonth.getMonth() - 1)
    // firstMonth.setDate(01)
    // nextmonth.setDate(01)
    var firstMonth = new Date("2021-10-01");
    var nextmonth = new Date("2021-11-01");
   var historyData= await User.aggregate(
     [
    {
      $match:{
        'history.TransactionType':"CANCELLATION",
        'history.isSystemOp': { $exists: false},
        'history.createdAt': {$gte: firstMonth, $lt:nextmonth},
        role: "user"
   }
  }
   ,
    {
        $group:{_id:"$serviceLine"
        , total: { $sum: 1 }
      }}
    ]).exec((err, items)=>{
        ServiceLine.populate(items, {path: '_id'}, function(err, populatedResult) {
          results = populatedResult
     
          return res.json({
            success: true,
            data: results,
            message: "Success",
          });
   
      });
      })

    return historyData;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}



exports.getSLCancelSystem = async function (res) {
  try {
    var results = []
    // var history = await History.find({ user: ObjectId('615710a16c48c59c424ccd50') })
//     var tab=[];
    var nextmonth = new Date();
    var firstMonth = new Date()

    firstMonth.setMonth(nextmonth.getMonth() - 1)
    firstMonth.setDate(01)
    nextmonth.setDate(01)
//   // for (var i = 0; i < 12; i++) {
   var historyData= await User.aggregate(
     [
    {
      $match:{
        'history.TransactionType':"CANCELLATION",
        'history.isSystemOp': { $exists: true},
        'history.createdAt': {$gte: firstMonth, $lt:nextmonth},
        role: "user"
   }
  }
   ,
    {
        $group:{_id:"$serviceLine"
        , total: { $sum: 1 }
      }}
    ]).exec((err, items)=>{
        ServiceLine.populate(items, {path: '_id'}, function(err, populatedResult) {
          results = populatedResult
     
          return res.json({
            success: true,
            data: results,
            message: "Success",
          });
   
      });
      })

    return historyData;
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}




exports.getSLStatBars = async function (res) {
  try {


    var content = await StatSL.find({
      slName: {$exists: true},
    });


    return content;
  } catch (e) {
    throw Error("Error while Paginating stats");
  }
};



exports.getTotalOperations = async function (res) {
  try {


    var content = await StatSL.find({
      slName: {$exists: false},
    });


    return content[0].totalOperations;
  } catch (e) {
    throw Error("Error while Paginating stats");
  }
};

  
  async function updateStatCancelation (firstMonth,nextmonth) {
    try{
  
    console.log("----------------begin statCancelation----------------------------");
    History.aggregate([
      { 
        $match:{
        TransactionType:"CANCELLATION",
        createdAt: {$gte: firstMonth, $lt:nextmonth},
         isSystemOp: false
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
        $group:{_id:"$userData.serviceLine"
          , total: { $sum: 1 }
        }
        
      },
    ]
    , async function (err, items)  {
            await ServiceLine.populate(items, {path: '_id'}, async function(err, populatedResult) {
              results = populatedResult
         
              var x=firstMonth.getMonth()
               for ( const sl of results ) {
                console.log("SL: ",sl._id.serviceLine);
                console.log("nbcancelations: ",sl.total);
                 var content = await StatSL.findOneAndUpdate(
                   {slName: sl._id.serviceLine}, 
                  { [`dataCancellations.${x}`] : sl.total },
                  );
  
               }
          });
          
        
        })
        console.log("end");
      } catch (e) {
        console.log(e);
        throw Error("error while updateStatCancelation", e);
      }
  }


  async function updateStatReservation  (firstMonth,nextmonth) {
    try{
      console.log("---------------------begin statReservation------------------------------");
    History.aggregate([
      { 
        $match:{
        TransactionType:"RESERVATION",
        createdAt: {$gte: firstMonth, $lt:nextmonth},
         
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
        $group:{_id:"$userData.serviceLine"
          , total: { $sum: 1 }
        }
        
      },
    ]
    , async function (err, items)  {
            await ServiceLine.populate(items, {path: '_id'}, async function(err, populatedResult) {
              results = populatedResult
              var x = firstMonth.getMonth();
              console.log("month: ",x);
              //return Promise.resolve(results);
               for ( const sl of results ) {
                 console.log("SL: ",sl._id.serviceLine);
                 console.log("nbreservations: ",sl.total);
                 var content = await StatSL.findOneAndUpdate({slName: sl._id.serviceLine},
                  { [`dataRaservations.${x}`] : sl.total },
                 )
               }
          });
          
        
        })
      console.log("end");
      } catch (e) {
        console.log(e);
        throw Error("error while updateStatReservation", e);
      }
  }


  async function updateStatChekins  (firstMonth,nextmonth) {
    try{
    console.log("-----------------------begin statCheckins--------------------");
    History.aggregate([
      { 
        $match:{
        TransactionType:"CHECKIN",
        createdAt: {$gte: firstMonth, $lt:nextmonth},
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
        $group:{_id:"$userData.serviceLine"
          , total: { $sum: 1 }
        }
        
      },
    ]
    , async function (err, items)  {
            await ServiceLine.populate(items, {path: '_id'}, async function(err, populatedResult) {
              results = populatedResult
              var x = firstMonth.getMonth()
               for ( const sl of results ) {   
                console.log("SL: ",sl._id.serviceLine);
                console.log("nbcheckins: ",sl.total);
                 var content = await StatSL.findOneAndUpdate({slName: sl._id.serviceLine}, 
                  { [`dataCheckins.${x}`] : sl.total },
                  );
               }
          });
          
        
        })
      console.log("end");
      } catch (e) {
        console.log(e);
        throw Error("error while updateStatChekins", e);
      }
  }


  async function updateStatCheouts  (firstMonth,nextmonth) {
    try{
    console.log("---------------------begin StatCheckout--------------------");
    History.aggregate([
      { 
        $match:{
        TransactionType:"CHECKOUT",
        createdAt: {$gte: firstMonth, $lt:nextmonth},
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
        $group:{_id:"$userData.serviceLine"
          , total: { $sum: 1 }
        }
        
      },
    ]
    , async function (err, items)  {
            await ServiceLine.populate(items, {path: '_id'}, async function(err, populatedResult) {
              results = populatedResult
              var x=  nextmonth.getMonth()
               for ( const sl of results ) {
                console.log("SL: ",sl._id.serviceLine);
                console.log("nbcheckouts: ",sl.total);
                 var content = await StatSL.findOneAndUpdate({slName: sl._id.serviceLine},
                  { [`dataCheckouts.${x}`] : sl.total },
                  );
               }
          });
          
        
        })
        console.log("end");
      } catch (e) {
        console.log(e);
        throw Error("error while updateStatCheouts ", e);
      }
  }


  async function updateStatCancelationSystem (firstMonth,nextmonth) {
    try{
    console.log("----------------begin statSystemcancelation--------------------------");
    History.aggregate([
      { 
        $match:{
        TransactionType:"CANCELLATION",
        createdAt: {$gte: firstMonth, $lt:nextmonth},
         isSystemOp: true
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
        $group:{_id:"$userData.serviceLine"
          , total: { $sum: 1 }
        }
        
      },
    ]
    , async function (err, items)  {
            await ServiceLine.populate(items, {path: '_id'}, async function(err, populatedResult) {
              results = populatedResult
              var x = firstMonth.getMonth()
               for ( const sl of results ) {
                console.log("SL: ",sl._id.serviceLine);
                console.log("nbsystemcancelations: ",sl.total);
                 var content = await StatSL.findOneAndUpdate({slName: sl._id.serviceLine},
                  { [`dataSysCancel.${x}`] : sl.total },
                  );
               }
          });
          
        
        })
      console.log("end");
      } catch (e) {
        console.log(e);
        throw Error("error while updateStatCancelationSystem", e);
      }
  }


 //cron.schedule("30 03 * * *",async function(){
 //  try {
 //    await StatsService.getDailyUserReservation()

 //  } catch (e) {
 //    console.log(e);
 //    throw Error("error while setting daily stat", e);
 //  }
 //})

 //cron.schedule("00 04 * * *",async function(){
 //  try {
 //    await StatsService.getWeeklyUserReservation()

 //  } catch (e) {
 //    console.log(e);
 //    throw Error("error while setting daily stat", e);
 //  }
 //})

 //cron.schedule("30 04 * * *",async function(){
 //  try {
 //    await StatsService.getMonthlyUserReservation()

 //  } catch (e) {
 //    console.log(e);
 //    throw Error("error while setting daily stat", e);
 //  }
// })








exports.getDailyUserReservation = async function  (res) {
  try {
 
    var date = new Date();
    var today = new Date("2020-01-01");
    var tomorrow = new Date("2020-01-01");
    today.setDate(date.getDate());
    today.setMonth(date.getMonth())
    today.setFullYear(date.getFullYear())
    // tomorrow.setDate(date.getDate());
    // tomorrow.setMonth(date.getMonth())
    // tomorrow.setFullYear(date.getFullYear())
    // console.log("date", today)
    // console.log("date2today", tomorrow)
     
      const content = await UserStat.create({
        date: today.toISOString().substring(0, 10),
     })

      History.aggregate([
        { 
                $match:{
                // TransactionType:"RESERVATION",
                'Reservation.reservationdate': today,
                // isSystemOp: false,
                // createdAt: {$gte: today, $lt:tomorrow},
                }
              },
              // { "$group": {
              //   "_id": {
              //     "isSystemOp": "$isSystemOp"
              //   }, "total": { "$sum": 1 }
              // }},
              { "$group": {
                "_id": {
                  "user" :"$user",
                  "TransactionType": "$TransactionType",
                  "isSystemOp": "$isSystemOp"
                }, "total": { "$sum": 1 }
              }},
        { "$group": {
            "_id": "$_id.user",
            "transactionType": { 
              "$push": { 
                  "transactionType": "$_id.TransactionType",
                  "isSystemOp": "$_id.isSystemOp",
                  "count": "$total"
              },
          },
            
            
        }},
     
      ], async function (err, items)  {
        await User.populate(items, {path: '_id'}, async function(err, populatedResult) {
                      results = populatedResult
                      console.log("results", results)
                    
                       for ( const user of results ) {
                        var nbReservations = 0
                        var nbCancellations = 0
                        var nbSystemCancellations = 0
                        var nbCheckins = 0
                        var nbCheckouts = 0
                        user.transactionType.map(item =>{
                          if(item.transactionType == "RESERVATION") {
                            nbReservations = item.count
                          } else if((item.transactionType == "CANCELLATION") && (item.isSystemOp == false) ) {
                            nbCancellations = item.count
                            
                          } else if((item.transactionType == "CANCELLATION") && (item.isSystemOp == true) ) {
                            nbSystemCancellations = item.count
                          } else if(item.transactionType == "CHECKIN") {
                            nbCheckins = item.count
                          } else if(item.transactionType == "CHECKOUT") {
                            nbCheckouts = item.count
                          }


                        })
                    
                         var content = await UserStat.findOneAndUpdate({date: today}, { $push: { Users: {
                                _id : user._id._id,
                                firstname: user._id.firstname,
                                lastname: user._id.lastname,
                                Email: user._id.Email,
                                grade: user._id.grade,
                                serviceLine: user._id.serviceLine,
                                subServiceLine: user._id.subServiceLine,
                                nbReservations: nbReservations,
                                nbCancellations: nbCancellations,
                                nbCheckins: nbCheckins,
                                nbCheckouts: nbCheckouts,
                                nbSystemCancellations : nbSystemCancellations
                              } } });
                       
    
    
                       }
                      return res.json({
                        success: true,
                        data: items,
                        message: "Success",
                       });
        
      })
     
    
    })
          
        

  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}


exports.getWeeklyUserReservation = async function (res) {
    
  var date = new Date()
  // var start_date = new Date("2021-01-01")
  // var end_date = new Date("2021-01-01")
  
  // start_date.setDate(date.getDate()-6)
  // start_date.setMonth(date.getMonth())
  // start_date.setFullYear(date.getFullYear())
  // end_date.setDate(date.getDate())
  // end_date.setMonth(date.getMonth())
  // end_date.setFullYear(date.getFullYear())


  var start_date = new Date("2021-10-10")
  var end_date = new Date("2021-10-16")
  console.log("start", start_date)
  console.log("end", end_date)

      const content = await UserStatWeekly.create({
        start_date: start_date,
        end_date: end_date,
     })

  UserStat.aggregate([
    { 
      $match:{
      date: {$gte: start_date, $lt:end_date}

      }
    },
    { $unwind: "$Users" },
    {
        $group: {
            _id: "$Users._id",
            totalReservations: { $sum: "$Users.nbReservations" },
            totalCancelations: { $sum: "$Users.nbCancellations" },
            totalChekins: { $sum: "$Users.nbCheckins" },
            totalCheckouts: { $sum: "$Users.nbCheckouts" },
            totalSysCancellations: { $sum: "$Users.nbSystemCancellations" },

        }
    },
 
], async function (err, items)  {
  await User.populate(items, {path: '_id'}, async function(err, populatedResult) {
    results = populatedResult
    console.log("results", results)
  
     for ( const user of results ) {
       console.log("start_date",start_date)
  
       var content = await UserStatWeekly.findOneAndUpdate({start_date: start_date}, { $push: { Users: {
              _id : user._id._id,
              firstname: user._id.firstname,
              lastname: user._id.lastname,
              Email: user._id.Email,
              grade: user._id.grade,
              serviceLine: user._id.serviceLine,
              subServiceLine: user._id.subServiceLine,
              nbReservations: user.totalReservations,
              nbCancellations: user.totalCancelations,
              nbCheckins: user.totalChekins,
              nbCheckouts: user.totalCheckouts,
              nbSystemCancellations : user.totalSysCancellations

            } } });
     


     }
    return res.json({
      success: true,
      data: results,
      message: "Success",
     });

})
  }
  )


}



exports.getMonthlyUserReservation = async function (res) {
    


  var date = new Date()
  // var start_date = new Date("2021-01-01")
  // var end_date = new Date("2021-01-01")
  
  // start_date.setDate(date.getDate()-6)
  // start_date.setMonth(date.getMonth())
  // start_date.setFullYear(date.getFullYear())
  // end_date.setDate(date.getDate())
  // end_date.setMonth(date.getMonth())
  // end_date.setFullYear(date.getFullYear())


  var start_date = new Date("2021-10-01")

  var end_date = new Date("2021-10-17")
  console.log("start", start_date)
  console.log("end", end_date)

      const content = await UserStatMonthly.create({
        month: start_date,
     })

     UserStatWeekly.aggregate([
    { 
      $match:{
        start_date: {$gte: start_date, $lt:end_date},
        end_date: {$gte: start_date, $lt:end_date}

      }
    },
    { $unwind: "$Users" },
    {
        $group: {
            _id: "$Users._id",
            totalReservations: { $sum: "$Users.nbReservations" },
            totalCancelations: { $sum: "$Users.nbCancellations" },
            totalChekins: { $sum: "$Users.nbCheckins" },
            totalCheckouts: { $sum: "$Users.nbCheckouts" },
            totalSysCancellations: { $sum: "$Users.nbSystemCancellations" },
        }
    },
 
], async function (err, items)  {
  await User.populate(items, {path: '_id'}, async function(err, populatedResult) {
    results = populatedResult
    console.log("results", results)
  
     for ( const user of results ) {
       console.log("start_date",start_date)
  
       var content = await UserStatMonthly.findOneAndUpdate({month: start_date}, { $push: { Users: {
              _id : user._id._id,
              firstname: user._id.firstname,
              lastname: user._id.lastname,
              Email: user._id.Email,
              grade: user._id.grade,
              serviceLine: user._id.serviceLine,
              subServiceLine: user._id.subServiceLine,
              nbReservations: user.totalReservations,
              nbCancellations: user.totalCancelations,
              nbCheckins: user.totalChekins,
              nbCheckouts: user.totalCheckouts,
              nbSystemCancellations : user.totalSysCancellations

            } } });
     


     }
    return res.json({
      success: true,
      data: results,
      message: "Success",
     });

})
  }
  )

}



exports.getUsersWeekStat = async function (start_date, end_date) {
  try {
      const content = await UserStatWeekly.find({
        start_date : start_date,
        end_date : end_date
      })

      return content[0]
    

  } catch (e) {
    console.log(e);
    throw Error("error while fetching weekly stat", e);
  }
}

exports.getUsersDayStat = async function (date) {
  try {
      const content = await UserStat.find({
        date : date
      })

      return content[0]
    

  } catch (e) {
    console.log(e);
    throw Error("error while fetching daily stat", e);
  }
}






exports.getUsersMonthStat = async function (month) {
  try {
      const content = await UserStatMonthly.find({
        month : month
      })

      return content[0]
    

  } catch (e) {
    console.log(e);
    throw Error("error while fetching monthly stat", e);
  }
}

exports.getUserIdMonthStat = async function (id, month) {
  try {
      const content = await UserStatMonthly.find({ month: month } )
      if (content.length !== 0 ) {
        var tab = content[0].Users
        const found = tab.find(element => element._id == id);
        var user = []
  
        if (found !== undefined ) {
          user.push(found)
        }

        return user
      } else {
        return []
      }
      


      
      
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}

exports.getUserIdALLStat = async function (id) {
  try {
      const content = await UserStatMonthly.find()
      var dataReservations = [0]
      var dataCancellations = [0]
      var dataCheckins = [0]
      var dataSystemCancellations = [0]

       for (item of content){
        var tab = item.Users
        const found = tab.find(element => element._id == id);
        if (found !== undefined ) {
          dataReservations.push(found.nbReservations)
          dataCancellations.push(found.nbCancellations)
          dataCheckins.push(found.nbCheckins)
          dataSystemCancellations.push(found.nbSystemCancellations)
        }

       }


      return {
        reservations: dataReservations,
        cancellations : dataCancellations,
        checkins : dataCheckins,
        systemCancellations : dataSystemCancellations

      }
      
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}

exports.getRessourcesMonthStat = async function (month) {
  try {
      const content = await StatsRessourceM.find({
        month : month
      })
      return content[0]
  } catch (e) {
    console.log(e);
    throw Error("error while fetching monthly stat", e);
  }
}
exports.getRessourcesWeekStat = async function (start_date, end_date) {
  try {
      const content = await StatsRessourceW.find({
        startDate : start_date,
        endDate : end_date
      })
      return content[0]
  } catch (e) {
    console.log(e);
    throw Error("error while fetching weekly stat", e);
  }
}
exports.getRessourcesDayStat = async function (date) {
  try {
      const content = await StatsRessourceD.find({
        date : date
      })
      return content[0]
  } catch (e) {
    console.log(e);
    throw Error("error while fetching daily stat", e);
  }
}

exports.getDailyStatResources = async function (res) {
  try {
    var date = new Date("2020-01-01");
    var today = new Date();
    var tomorrow = new Date();
    date.setDate(today.getDate()-16);
    date.setMonth(today.getMonth())
    date.setFullYear(today.getFullYear())
    tomorrow.setDate(today.getDate()+1);
    console.log("date", date)
    console.log("date2today", today)
    const content = await StatsRessourceD.create({
        date: date.toISOString().substring(0, 10),
     })
    History.aggregate(
      [
      {
              $match:{
               TransactionType:"CHECKIN",
              'Reservation.reservationdate': date,
              }
            },
            {
              $lookup: {
                  from: 'desks',
                  localField: 'Reservation.desk',
                  foreignField: '_id',
                  as: 'DesksData'
              }
          },
          {
            $lookup: {
                from: 'zones',
                localField: 'DesksData.zone',
                foreignField: '_id',
                as: 'ZonesData'
            }
        },
        {
          $lookup: {
              from: 'floors',
              localField: 'ZonesData.floor',
              foreignField: '_id',
              as: 'FloorsData'
          }
      },
      {
        "$group":
        {
           "_id": {
             "Desks" :"$DesksData",
             "Zones" :"$ZonesData",
             "Floor" :"$FloorsData",
                 },
           "p": { "$sum": 1/2*100},
         }
       },
       {
        $project:
      {
        "pourcentage": {"$cond": { if: { $gte: [ "$p", 100 ] }, then: 100, else: "$p" }}
      }
    },
      {
        "$group":
        {"_id":{
          "Zones" :"$_id.Zones",
          "Floor" :"$_id.Floor",
         },
            "Desks":
                {
                  "$push":
                 {  "id":{ "$first": "$_id.Desks._id"},
                 "name":{ "$first": "$_id.Desks.name"},
                    "CountD": "$pourcentage"
                }
                },
                "totalpourcentageDesk":{"$sum":"$pourcentage"},
                "count": { "$first": "$_id.Zones"  },
                "countf":{"$first": { "$first": "$_id.Floor.Zones"} } ,
        }
    },
    {
      "$group":
      {"_id":{"Floore":{ "$first": "$_id.Floor._id"}},
          "Zones":
              {
                "$push":
               { "Desks":"$Desks",
                  "id_Zones": { "$first":"$_id.Zones._id"},
                  "pourcentzone":{"$divide": [ "$totalpourcentageDesk",{ "$size": { "$first": "$count.Desks"  }   }]}
                  ,
                  "nbDesksZone":{ "$size": { "$first": "$count.Desks"  }   },
                 "countZoneFloor":{"$size":"$countf"},
               }
              },
        }
  },  
  {
    "$group":
    {"_id":"$_id.Floore",
        "Floor":
            {
              "$push":
             { "Zones":"$Zones",
             "pourcentfloor":{"$divide": [{"$sum":"$Zones.pourcentzone"},{ "$first":"$Zones.countZoneFloor"}]},
             }
            },
      }
},
    ],
    async function (err, items)  {
  // console.log(items)
           for ( const floor of items ) {
//console.log(floor)
// const Desks=Array.from(floor.Floor[0].Zones,  ({Desks}) => Desks)
// console.log(Desks);
const data ={
  _id:floor._id,
  Zones:floor.Floor[0].Zones,
  pourcentFloor: floor.Floor[0].pourcentfloor
}
                         await StatsRessourceD.findOneAndUpdate({date: date}, { $push: {
                          Floor: data
                         } });
                        }
                  return  res.json({
                    success: true,
                    data: items,
                    message: "Success",
                  });
  })
  } catch (e) {
    console.log(e);
    throw Error("error while calculating nb of reservations", e);
  }
}


exports.getDailyOperations = async function (date) {
  try {

    // var date = new Date()
    // var today = new Date("2020-01-01");
    // var tomorrow = new Date("2020-01-01");
    // today.setDate(date.getDate());
    // today.setMonth(date.getMonth())
    // today.setFullYear(date.getFullYear())
    // tomorrow.setDate(date.getDate() + 1);
    // tomorrow.setMonth(date.getMonth())
    // tomorrow.setFullYear(date.getFullYear())

    var today = new Date("2021-11-28");
    var tomorrow = new Date("2021-11-29");
   
    var users = []

    
    var content = await History.find({
      user: '615710a36c48c59c424ccd5d'
    })

    var content = await History.find({
      createdAt: {
        $gte: today.toISOString().substring(0, 10),
        $lt: tomorrow.toISOString().substring(0, 10),
      },
    }).populate({
        path: 'Reservation.desk',
        model: 'Desk',
        select: { 'name': 1,'zone':1, 'reservations':0},
        populate: {
          path: 'zone',
          select: { 'name': 1, 'Desks': 0}
        }

      }).populate({
          path: 'user',
          model: 'User',
          populate: {
            path: 'serviceLine',
            select: { 'serviceLine': 1}
          }
      })

      await content.map( item => {
        users.push({
          user : item.user.firstname + ' ' + item.user.lastname,
          SL: item.user.serviceLine.serviceLine,
          SSL: item.user.subServiceLine,
          Transaction: item.TransactionType,
          ReservationDate: item.Reservation.reservationdate.toISOString().substring(0,10),
          TimeSlot: item.Reservation.timeslot,
          Resource: item.Reservation.desk.name,
          Zone: item.Reservation.desk.zone.name,
          TransactionDate: item.createdAt,
          IsSystemAction: item.isSystemOp
        })
      })


   

    const result = await DailyOperation.create({
      date: today.toISOString().substring(0, 10),
      Operations : users
    })

    return users;
  } catch (e) {
    console.log(e)
    throw Error("Error while Paginating stats");
  }
};
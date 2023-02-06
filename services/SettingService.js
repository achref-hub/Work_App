const Settings = require('../models/Settings');
const userService = require('./UserService');

const { ObjectId } = require('mongodb');
const User = require('../models/User');
//const Settings = require('../models/Settings');

exports.addBalanceSettings = async function (document) {
  try {
    var content = await Settings.create({
      name: document.name,
      WFHweekBalance: document.WFHweekBalance,
      WFHmonthBalance: document.WFHmonthBalance,
    });

    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while adding balance ');
  }
};
exports.getSettingsByType = async function(){
  try{
    var content = await Settings.find({
      type : "Leaves",
    });
    return content;
   } catch (e){
    console.log(e);
    throw Error('Error while adding balance ');
  }
};
exports.getSettingsByslot =async function (){
  try{
    var content = await Settings.find({
      type:"slot",
    });
    return content;
  }catch(e){
console.log(e);
throw Error('Error while adding balance ');
  }
};
exports.getSettingsByName = async function (name) {
  try {
    var content = await Settings.find({
      name: name,
    });

    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while adding balance ');
  }
};

exports.getSettings = async function () {
  try {
    var content = await Settings.find().populate('grades');

    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while addfetching settings ');
  }
};

exports.getBalances = async function () {
  try {
    var content = await Settings.findOne({name: "WFH_Balance"}).select({WFHweekBalance:1, WFHmonthBalance:1, _id: 0})

    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while addfetching settings');
  }
};

exports.updateSettings = async function (id, document) {
  try {
    // const filter = { name: name };
    // const update = {
    //   WFHweekBalance: document.WFHweekBalance,
    //   WFHmonthBalance: document.WFHmonthBalance,
    // };
    var content = await Settings.findOneAndUpdate({_id: id}, document);



    return content;
  } catch (e) {
    console.log(e);
    throw Error('Error while adding balance ');
  }
};
// exports.addUsersBalance = async function () {
//   try {

//     var arrWeek = []
//     var arrMonth = []

//     for (let index = 1; index < 53; index++) {
//       arrWeek.push({
//         nb: index,
//         count: 3
//       })

//     }
//     for (let index = 1; index < 13; index++) {
//       arrMonth.push({
//         nb: index,
//         count: 10
//       })

//     }
//     var users = await User.find()

//     for (user of users ) {
//       var content = await Balance.create({
//         idUser: user._id,
//         WFHweekBalance : arrWeek,
//         WFHmonthBalance : arrMonth
//       });
//     }

//     return users;
//   } catch (e) {
//     console.log(e);
//     throw Error("Error while creating users balances ");
//   }
// };

// exports.getUserBalance = async function (id) {
//   try {

//     var data = await Balance.find({idUser: id})

//     return data;
//   } catch (e) {
//     console.log(e);
//     throw Error("Error while finding user balances ");
//   }
// };

const Balance = require("../models/Balance");
const userService = require('./UserService')
const SettingService = require('./SettingService');

const { ObjectId } = require("mongodb");
const User = require("../models/User");
const cron = require('node-cron')




exports.addUserBalance = async function (id) {
  try {
    var arrWeek = []
    var arrMonth = []

    for (let index = 1; index < 53; index++) {
      arrWeek.push({
        nb: index,
        count: 0
      })
      
    }
    for (let index = 1; index < 13; index++) {
      arrMonth.push({
        nb: index,
        count: 0
      })
      
    }
    var content = await Balance.create({
      idUser: id,
      WFHweekBalance : arrWeek,
      WFHmonthBalance : arrMonth,
    });

    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while adding balance ");
  }
};


exports.addUsersBalance = async function () {
  try {

    var arrWeek = []
    var arrMonth = []

    for (let index = 1; index < 53; index++) {
      arrWeek.push({
        nb: index,
        count: 0
      })
      
    }
    for (let index = 1; index < 13; index++) {
      arrMonth.push({
        nb: index,
        count: 0
      })
      
    }
    var users = await User.find()

    for (user of users ) {
      var content = await Balance.create({
        idUser: user._id,
        WFHweekBalance : arrWeek,
        WFHmonthBalance : arrMonth
      });
    }
    

    return users;
  } catch (e) {
    console.log(e);
    throw Error("Error while creating users balances ");
  }
};


exports.getUserBalance = async function (id) {
  try {

    var data = await Balance.find({idUser: id}) 
    

    return data;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding user balances ");
  }
};

exports.updateBalance = async function (id, document) {
  try {

    var data = await Balance.updateOne({_id: id}, document) 
    

    return data;
  } catch (e) {
    console.log(e);
    throw Error("Error while updating balances ");
  }
};
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
  return weekNo;
}



// Monthly cron 
cron.schedule("44 3 1 * *",async function(){
  
  const date = new Date()
  var lastMonth = date

  lastMonth.setMonth(date.getMonth()-1)
  const month = lastMonth.getMonth()



  console.log(month)
  var balances = await Balance.find()

  for ( balance of balances ) {
    var WFHmonthBalance = balance.WFHmonthBalance
    // console.log('j', balance.WFHmonthBalance[month])
    WFHmonthBalance[month].count = 0

    var result = await Balance.findByIdAndUpdate({ _id: ObjectId(balance._id) }, {
      WFHmonthBalance: WFHmonthBalance,
    })

  }

  

 })


// Weekly cron
 cron.schedule("47 23 * * SUN",async function(){
  


  var nb = getWeekNumber(new Date)


  console.log(nb)
  var balances = await Balance.find()

  for ( balance of balances ) {
    
    var WFHweekBalance = balance.WFHweekBalance
    var i = WFHweekBalance.findIndex(x => x.nb == nb);
    WFHweekBalance[i].count = 0;
    
    var result = await Balance.findByIdAndUpdate({ _id: ObjectId(balance._id) }, {
      WFHweekBalance: WFHweekBalance
    })

  }

  

 })


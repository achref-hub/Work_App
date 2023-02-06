var mongoose = require("mongoose");


var Calendar = new mongoose.Schema({  

  date: Date,
  
  
  
  
 
});

Calendar.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("Calendar", Calendar);

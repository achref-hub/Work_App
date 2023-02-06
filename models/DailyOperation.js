var mongoose = require("mongoose");

var DailyOperationSchema = new mongoose.Schema({  

  date : Date,
  Operations : Array,
  
  
  
});

DailyOperationSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("DailyOperation", DailyOperationSchema);

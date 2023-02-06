var mongoose = require("mongoose");

var StatsRessourceWSchema = new mongoose.Schema({  
  startDate : Date,
  endDate : Date,

  Floor: [],
 
  
});

StatsRessourceWSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("StatsRessourceW", StatsRessourceWSchema);

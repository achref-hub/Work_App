var mongoose = require("mongoose");

var StatsRessourceMSchema = new mongoose.Schema({  
  month : String,

  Floor: [],
 
  
});

StatsRessourceMSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("StatsRessourceMonth", StatsRessourceMSchema);

var mongoose = require("mongoose");

var StatsRessourceDSchema = new mongoose.Schema({  
  date : Date,
  Floor:[ ]

});

StatsRessourceDSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("StatsRessourceDaily", StatsRessourceDSchema);

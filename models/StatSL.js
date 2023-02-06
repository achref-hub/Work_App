var mongoose = require("mongoose");

var StatSLSchema = new mongoose.Schema({  

  slName : String,
  dataRaservations : Array,
  dataCancellations : Array,
  dataCheckins : Array,
  dataCheckouts : Array,
  dataSysCancel : Array,
  totalOperations: Array,
  
  
});

StatSLSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model("StatSL", StatSLSchema);

var mongoose = require("mongoose");

var SubServiceLineSchema = new mongoose.Schema({
subServiceLine : {
    type: String,
    required:true,
},
ServiceLine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ServiceLine",   
  },
Accesses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Access",
      autopopulate: true,
    },
  
],

//Amira : added Users
Users: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true,
  },
],
});

module.exports = mongoose.model("SubServiceLine", SubServiceLineSchema);

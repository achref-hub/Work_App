var mongoose = require("mongoose");

var GroupAccessSchema = new mongoose.Schema({

    Group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",   
      },


    Zones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Zone",
        autopopulate: true,
      },
  ]
  }
);

module.exports = mongoose.model("GroupAccess", GroupAccessSchema);

var mongoose = require("mongoose");
var Operation = require('./Operation')


var RequestSchema = new mongoose.Schema({
  idSender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  idReciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  UserNotif: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  status: {
    type: String,
    enum: ["pending", "accepted", "refused"],
    default: "pending",
  },
  name: String,
  commentUser: String,
  commentManager: String
  
  
  
 
},{timestamps:true});

RequestSchema.plugin(require('mongoose-autopopulate'));

RequestSchema.post('remove', function(doc) {
  this.model('Operation').remove({request: doc._id}).exec();
});

module.exports = mongoose.model("Request", RequestSchema);

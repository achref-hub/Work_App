var mongoose = require("mongoose");

var UsersManagerSchema = new mongoose.Schema(
  {
    First_name: {
      type: String,
      trim: true,
    },
    Last_name: {
      type: String,
      trim: true,
    },
    Registration_number: {
      type: String,
      trim: true,
    },
    Grade: {
      type: String,
      trim: true,
    },
    Role: {
      type: String,
      trim: true,
    },
    Manager: {
      type: String,
      trim: true,
    },
    Manager_GPN: {
      type: String,
      trim: true,
    }, 
    
    Email: {
      type: String,
      trim: true,
    }


  },
  
  {
    timestamps: true,
  }

);
UsersManagerSchema.plugin(require("mongoose-autopopulate"));
module.exports = mongoose.model("UsersManager", UsersManagerSchema);

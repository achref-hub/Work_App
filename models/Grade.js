var mongoose = require("mongoose");

var GradeSchema = new mongoose.Schema({
    grade_name : {
        type: String,
        required: true
    },
    
    
    Accesses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Access",
          autopopulate: true,
        },
      
    ],

});

module.exports = mongoose.model("Grade", GradeSchema);

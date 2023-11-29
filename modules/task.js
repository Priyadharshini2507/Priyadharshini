const mongoose = require("mongoose");

const userSchema2 = new mongoose.Schema(
  {
    taskname:String,
    description:String,
    duration:String,
    status:String,
    assigned:String,
    notification:Number,
    comment:String,
    dates1:String,
    assigndate:String,
    taskid:Number,
   }
);
module.exports = mongoose.model("tasks", userSchema2);
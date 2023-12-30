const Mongoose = require("mongoose");
const TaskSchema = Mongoose.Schema({
    tid: String,
      
    tname : String,
    tdept : String, 
    tdesc:String}
)
const TaskModel = Mongoose.model("task",TaskSchema);
module.exports = TaskModel;
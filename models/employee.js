const Mongoose = require("mongoose");
const EmplSchema = Mongoose.Schema({
    eid: String,
      
    ename : String,
    edept :String,
    eemail: String,
    edesc:String}
)
const EmplModel = Mongoose.model("employee",EmplSchema);
module.exports = EmplModel;
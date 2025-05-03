// require("../config/db");
let mongoose = require("../config/db");

let EmployeeSchema = new mongoose.Schema({
  
  fullname: { type: String, required: true },
  number: { type: String },
  designation: { type: String },
  photo: { type: String, }, 
  otp: {type: String},
  otpExpires: {type:String},
  adminId:{type: mongoose.Schema.Types.ObjectId, ref:"Admin"},
  role: { type: String, enum: ["employee"], default: "employee" } 
},{ timestamps: true });

let Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;





















// fullname: { type: String, required: true },
  // number: { type: String, required: true },
  // designation: { type: String, required: true },
  // docs: { type: String, required: true },
  // images: { type: String, required: true },

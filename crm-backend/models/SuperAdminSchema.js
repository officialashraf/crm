// require('../config/db');
let mongoose = require("../config/db")

let SuperAdminSchema = new mongoose.Schema({
    fullname:{type:String},
    number : { type: String, required: true, unique: true},
    otp: { type: String },
    otpExpires: { type: Date },
    role: { type: String, enum: ["superadmin"], default: "superadmin" } 
  },{ timestamps: true });

let SuperAdmin = mongoose.model("SuperAdmin", SuperAdminSchema);
module.exports = SuperAdmin;
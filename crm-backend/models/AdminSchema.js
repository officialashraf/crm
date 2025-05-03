// require("../config/db");
let mongoose = require("../config/db");

let AdminSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String },
    number: { type: String, required: true, unique: true },
    company: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    isSubscribed: { type: Boolean, default: false },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

let Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;

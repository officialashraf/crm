let mongoose = require("../config/db")

let LoginSchema = new mongoose.Schema({
    number:{type:String, required:true, unique:true},
    role:{type:String, enum:["superadmin","admin","employee"], required:true},
    otp:{type:String},
    otpExpires:{type:Date},
},{timestamps:true});

let Login = mongoose.model("login", LoginSchema)

module.exports = Login

const jwt = require("jsonwebtoken")
const generateOTP = require("../utils/Otp")
require("dotenv").config({ path: "./config/.env" });
const { JWT_SECRET_KEY } = process.env;
const Admin = require("../models/AdminSchema")
const Employee = require("../models/EmployeSchema")


const CreateAdmin = async(req,res)=>{
  try{
    const {fullname,email,number,company} = req.body;
if(!fullname || !email || !number || !company){
  return res.status(400).json({massage:"this field is require"})
}
const newadmin = new Admin({
  fullname,
  email,
  number,
  company,
})
await newadmin.save();
res.status(200).json({massage:"admin create successfully", success:true, admin: newadmin})

  }catch(error){
    console.error("error create admin",error);
    return res.status(500).json({massage:"internal server error", success:false})
  }
}

const GetAdminProfile = async(req,res)=>{
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, JWT_SECRET_KEY);
    const admin = await Admin.findById(decode.id)
if(!admin){ 
  return res.status(400).json({massage:"admin note found"});
}
res.json(admin);

  }catch(error){
    console.error(error);
    return res.status(500).json({massage:"internal sever error"})
  }
}









const SendOTP = async(req,res)=>{
    
    try{
      const {number} = req.body;
      const admin = await Admin.findOne({number});
      if(!admin){
          return res.status(404).json({error: "Employee note found"})
        }

      console.log("error" , req.body)
      const otp  = generateOTP();
      const otpExpires = Date.now() + 10 * 60 *1000;
      admin.otp = otp;
      admin.otpExpires = otpExpires;
      await admin.save();
      
      console.log(`OTP send to ${number} : ${otp}`)
      res.json({massage : "OTP send SuccessFully"})
    }catch(error){
        console.error("Error in SendLoginOTP:", error);
      res.status(500).json({error: error.massage})
    }
  };
  
  
const VerifyOTP = async(req,res)=>{

    try{
      const {number, otp} = req.body;
      const admin = await Admin.findOne({number});
      if(!admin){
        return res.status(404).json({error : "Employee not found"})
      }
      if(admin.otp !== otp || admin.otpExpires  < Date.now()){
        return res.status(400).json({error : "Invalid or Expire OTP"});
      }
    
      const token = jwt.sign({id: admin._id},JWT_SECRET_KEY,{expiresIn:'24h'})
      res.json({token});
    
    }catch(error){
       res.status(500).json({ error: error.message });
    }
    }
    
    
    const CheckuserType = async (req, res) => {
      try {
        const { number } = req.body;
    
        // Check if the number belongs to an employee
        const employee = await Employee.findOne({ number: number });
        if (employee) {
          return res.json({ userType: "employee" });
        }
    
        // Check if the number belongs to an admin
        const admin = await Admin.findOne({ number: number });
        if (admin) {
          return res.json({ userType: "admin" });
        }
    
        // If no user is found, return a response indicating that
        return res.status(404).json({ message: "User not found" });
    
      } catch (error) {
        // Handle any unexpected errors
        console.error("Error in CheckuserType:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    };


module.exports = {SendOTP,VerifyOTP,CheckuserType,CreateAdmin,GetAdminProfile};
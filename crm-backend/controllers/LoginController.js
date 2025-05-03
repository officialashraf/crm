let moment = require("moment");

const generateOTP = require("../utils/Otp");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config/.env" });
const { JWT_SECRET_KEY } = process.env;
const Login = require("../models/LoginSchema");
const Admin = require("../models/AdminSchema")
const SuperAdmin  = require("../models/SuperAdminSchema")
const Employee = require("../models/EmployeSchema")

 const SendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    if (!number) {
      return res.status(400).json({ massage: "number  required" });
    }
    // let user = await Login.findOne({ number});
    let user = await SuperAdmin.findOne({ number }) ||
               await Admin.findOne({ number }) ||
               await Employee.findOne({ number });



    if (!user) {
      return res.status(404).json({ massage: "user Note found" });
    }

    let otp = generateOTP();
    const otpExpires = moment().add(5, "minutes").toISOString();;

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    console.log(`OTP  for ${number} : ${otp}`);

    return res.json({ massage: "OTP Send Successfully ", otp });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ massage: "server Error" });
  }
};

 const VerifyOTP = async (req, res) => {
  try {
    const { number, otp } = req.body;

    if (!number || !otp) {
      return res
        .status(400)
        .json({ massage: " Number role OTP are Required " });
    }

    // let user = await Login.findOne({ number});
    let user = await SuperAdmin.findOne({ number }) ||
    await Admin.findOne({ number }) ||
    await Employee.findOne({ number });


    if (!user) {
      return res.status(400).json({ massage: " Invalid OTP" });
    }
    if (user.otp !== otp) {
      return res.status(400).json({ massage: " Invalid OTP" });
    }
    
    

    // if (moment().isAfter(user.otpExpires)) {
    //   return res.status(400).json({ massage: "otp Expired" });
    // }

    const otpExpiryTime = moment(user.otpExpires, moment.ISO_8601);
    if (moment().isAfter(otpExpiryTime)) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // if (!user.role) {
    //   return res.status(500).json({ message: "Role not found for user" });
    // }

    const token = jwt.sign(
      { id: user._id, number: user.number, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    // res.json({ token });

    user.otp = null;
    user.otpExpires = null;
    await user.save();

    console.log("User logged in:", { id: user._id, number: user.number, role: user.role });

    
    return res
      .status(200)
      .json({
        massage: "Login Successfull",
        token,
        user: { id: user._id, number: user.number, role: user.role },
      });
  } catch (error) {
console.error(error)
return res.status(500).json({massage:"server error"})

  }
};

const GetAdminProfile = async(req,res)=>{
  try {
    // ✅ Step 1: Check for Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Token is missing or invalid" });
    }

    // ✅ Step 2: Extract Token from Header
    const token = authHeader.split(" ")[1];

    // ✅ Step 3: Verify Token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // console.log("Decoded Token:", decoded);

    // ✅ Step 4: Fetch User from Database
    let user;
    switch (decoded.role) {
      case "superadmin":
        user = await SuperAdmin.findById(decoded.id).select("-otp -otpExpires");
        break;
      case "admin":
        user = await Admin.findById(decoded.id).select("-otp -otpExpires");
        break;
      case "employee":
        user = await Employee.findById(decoded.id)
          .select("-otp -otpExpires")
          .populate("adminId", "fullname email number"); // Admin Info Bhi Fetch Karega
        break;
      default:
        return res.status(400).json({ message: "Invalid role in token" });
    }

    // ✅ Step 5: Handle User Not Found
    if (!user) {
      return res.status(404).json({ message: `${decoded.role} not found` });
    }

    // ✅ Step 6: Return User Profile
    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};





module.exports = {SendOTP, VerifyOTP,GetAdminProfile}
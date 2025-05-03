// const cloudinary = require('../middlewares/cloudinary');
// const fs = require('fs');

let Employee = require("../models/EmployeSchema");
const jwt = require("jsonwebtoken")
const generateOTP = require("../utils/Otp")
require("dotenv").config({ path: "./config/.env" });
const { JWT_SECRET_KEY } = process.env;

const CreateEmployee = async (req, res) => {
  try {
    const { fullname, number, designation,adminId } = req.body;

    // if (!req.file) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Photo is required" });
    // }

    const newEmployee = new Employee({
      adminId,
      fullname,
      number,
      designation,
      photo: req.file ?  req.file.path : null,
    });

    await newEmployee.save();

    res.status(201).json({ success: true, employee: newEmployee });
  } catch (error) {
    console.error("Error creating employee:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const GetEmployeeByAdmin = async(req,res)=>{
  try{
    const {adminId} = req.params;

    const employee = await Employee.find({adminId});
    res.status(200).json(employee)
  }catch(error){
    console.error(error,"employee get admin bys error")
    return res.status(500).json({massage: "intarnal server error"})

  }
};





const GetEmployee = async (req, res) => {
  try {
    const employee = await Employee.find();
    console.log(employee);
    if (!employee) {
      return res.status(404).json({ message: "Employee Note Found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error("Error Fetching Employee", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const DeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEmployee = await Employee.findByIdAndDelete(id);
    if (!deleteEmployee) {
      return res.status(404).json({ massage: "Employee Note found" });
    }
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting user" });
  }
};

const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate if the employee exists
    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    let updatedData = { ...req.body }; // Include all fields from req.body

    // If a new file (photo) is uploaded, update the photo field
    if (req.file) {
      updatedData.photo = req.file ?  req.file.path : null;
    }
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      updatedData,
      { new: true } // Return the updated documen
    );

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error updating employee" });
  }
};

const sendLoginOTP = async(req,res)=>{
  try{
    const {number} = req.body;
    const employees = await Employee.findOne({number});
    if(!employees){
      return res.status(404).json({error: "Employee note found"})
    }
    console.log("eroor" , req.body)
    const otp  = generateOTP();
    const otpExpires = Date.now() + 10 * 60 *1000;
    employees.otp = otp;
    employees.otpExpires = otpExpires;
    await employees.save();
    
    console.log(`OTP send to ${number} : ${otp}`)
    res.json({massage : "OTP send SuccessFully"})
  }catch(error){
    res.status(500).json({error: error.massage})
  }
};

const verifyOTP = async(req,res)=>{

try{
  const {number, otp} = req.body;
  const employees = await Employee.findOne({number});
  if(!employees){
    return res.status(404).json({error : "Employee not found"})
  }
  if(employees.otp !== otp || employees.otpExpires  < Date.now()){
    return res.status(400).json({error : "Invalid or Expire OTP"});
  }

  const token = jwt.sign({id: employees._id},JWT_SECRET_KEY,{expiresIn:'24h'})
  res.json({token});

}catch(error){
   res.status(500).json({ error: error.message });
}
}

const getEmployeeProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    const employee = await Employee.findById(decoded.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

};




module.exports = {
  CreateEmployee,
  GetEmployee,
  DeleteEmployee,
  UpdateEmployee,
  sendLoginOTP,
  verifyOTP,
  getEmployeeProfile,


  GetEmployeeByAdmin
};

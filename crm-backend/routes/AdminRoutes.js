// let routes = require("express").Router();
let express = require("express")
let {SendOTP,VerifyOTP,CreateAdmin,GetAdminProfile,CheckuserType} = require("../controllers/AdminController")
const authenticateToken  = require("../middlewares/Auth")

let routes = express.Router()

routes.post('/admin/createadmin',CreateAdmin);
routes.get("admin/profile",GetAdminProfile);

routes.post('/admin/sendotp',SendOTP)
routes.post('/admin/verify',VerifyOTP)
routes.post('/check-user-type',CheckuserType)
routes.get('/admin/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
  });
  module.exports = routes;
  
  // console.log(SendOTP)
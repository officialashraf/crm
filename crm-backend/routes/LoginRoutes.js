let express = require("express");
let routes = express.Router()
let authenticateToken = require("../middlewares/Auth");
const { SendOTP, VerifyOTP,GetAdminProfile } = require("../controllers/LoginController");


routes.get("/profile",GetAdminProfile)
routes.post("/sendotp",SendOTP)
routes.post("/verify",VerifyOTP)
routes.get("/protected",authenticateToken, (req,res)=>{
    res.json({massage: "this is protected Route"})
})

module.exports = routes;
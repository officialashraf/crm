const express = require("express");
let cors = require("cors");
// const multer = require('multer');
const path = require('path');
let admin = require('./routes/AdminRoutes')
let leads = require('./routes/LeadRoutes')
let employee = require('./routes/EmployeeRoutes')
let superadmin = require('./routes/SuperAdminRoutes')
let login = require("./routes/LoginRoutes")

require("dotenv").config({ path: "./config/.env" });
let app = express();
// -------Live Server Code (start)---------*/
const root = require("path").join(__dirname, "build");
 app.use(express.static(root));
// -------Live Server Code (end)---------*/
// const root = path.join(__dirname, 'public'); // Set the root directory for static files

app.use(express.static("public"));


app.get("/download-sample",(req,res)=>{
    const filePath = path.join(__dirname, "public", "formate.xlsx")
    res.download(filePath, "formate.xlsx",(err)=>{
        if(err){
            console.error("formate file download error",err)
            res.status(500).send("error Download File")
        }
    })

})



app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads',express.static(path.join(__dirname+"/assets")));
app.use(cors())
app.use("/",admin);
app.use("/login",login);
app.use("/superadmin",superadmin);
app.use("/employee",employee);
app.use("/leads",leads);
app.use(superadmin);
/*-------Live Server Code (start)---------*/
app.get("*", (req, res)=>{
    res.sendFile("index.html", {root});
})
/*-------Live Server Code (end)---------*/




module.exports = app

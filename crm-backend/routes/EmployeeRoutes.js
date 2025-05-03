const express = require("express");
const { CreateEmployee,GetEmployee,DeleteEmployee,GetEmployeeByAdmin,UpdateEmployee,getEmployeeProfile, sendLoginOTP,
    verifyOTP } = require("../controllers/EmployeeController");
const upload = require("../middlewares/cloudinary");
// const upload = require("../middlewares/multer");
let routes = express.Router();
const authenticateToken  = require("../middlewares/Auth")


routes.post('/', upload.single('photo'),CreateEmployee);

routes.put('/:id', upload.single('photo'),UpdateEmployee);

routes.get('/',GetEmployee);
routes.get('/adminby/:adminId',GetEmployeeByAdmin);


routes.delete('/:id',DeleteEmployee);   

routes.post('/sendotp',sendLoginOTP);

routes.post('/verifyotp',verifyOTP);
routes.get("/profile",getEmployeeProfile)

// Example of a protected route
routes.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'This is a protected route' });
  });

module.exports = routes;

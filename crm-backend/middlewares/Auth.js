require("dotenv").config({ path: "./config/.env" });
const { JWT_SECRET_KEY } = process.env;
const jwt = require("jsonwebtoken")


const authenticateToken = (req,res,next)=>{
    const token = req.headers['authorization'];
    if(!token){
return res.status(403).json({error : "Token note provided"})
    }
    

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Invalid Token" });
        }
        req.user = user;
        next();
      });
}
module.exports = authenticateToken
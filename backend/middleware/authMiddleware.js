const adminModel = require("../models/admin");
const JWTService = require("../services/JWTService");


const authMiddleware = async (req,res,next) =>{

    try {
        
   
    const { token } = req.cookies;
    if(!token){
        return res.status(401).json({message: "Unauthorized"});
    }

    const verifyToken = JWTService.verifyToken(token);

    const admin = await adminModel.findOne({_id: verifyToken._id})
     if(!admin){
        return res.status(401).json({message: "Not Found"});
     }


     req.admin = admin

     next()

    } catch (error) {
        return res.status(401).json({auth: false, message: "Token Expired"}); 
    }


}

module.exports = authMiddleware
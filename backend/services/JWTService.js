const JWT = require("jsonwebtoken")
const {JWT_TOKEN_KEY} = require("../config/index")

class JWTService {

    static signToken(payload, expiresIn){
      return JWT.sign(payload, JWT_TOKEN_KEY, {expiresIn});
    }

    static verifyToken(token){
      return  JWT.verify(token, JWT_TOKEN_KEY);
    }

}

module.exports = JWTService;
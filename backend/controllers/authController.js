const Joi = require("joi");
const Voter = require("../models/voter");

const authController = {

    async login(req,res){

        const loginSchema = Joi.object({
            cnic: Joi.string().length(13).required()
        });

        const validate = loginSchema.validate(req.body);
        if(validate.error){
           return res.status(400).json({success: false, message:validate.error.message})
        }

        try {
            const {cnic} = req.body;

            const user = await Voter.findOne({cnic: cnic})

            if(!user){
                return res.status(404).json({success:false,message:'User not found'})
            }
            
        } catch (error) {
            return res.status(500).json({success:false,message:'Internal Server Error'})
        }

        return res.status(200).json({success:true,message:'User login successfully'})


    }
}

module.exports = authController
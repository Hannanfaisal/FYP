const Joi = require("joi");
const adminModel = require("../models/admin");

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

const adminController = {
    
    async update(req,res){

        const updateSchema = Joi.object({
            name: Joi.string().optional(),
            email: Joi.string().email().optional(),
            phone: Joi.string().min(11).max(12).optional(),
            photo: Joi.string().optional(),
            
            id: Joi.string().regex(mongodbIdRegex).required(),

        })
        const validate = updateSchema.validate(req.body)
        if(validate.error){
            return res.status(400).json({success: false,message: validate.error.message})
        }

        let updatedUser;

        try {
            
            const {  name,email,phone,photo,id} = req.body;

            const admin = await adminModel.findOne({_id: id});
            if(!admin){
                return res.status(404).json({success: false, message: 'User not found'})
            }

            updatedUser = await adminModel.findByIdAndUpdate({_id: id}, {name,email,phone,photo}, {new: true})


            
        } catch (error) {
            return res.status(500).json({success: false,message: "Internal Server Error", error: error.message})
        }

        return res.status(200).json({success: true,message: "Profile updated successfully", updatedUser})
    },

    async getAll(req,res){

        let admins;
        try {

          admins = await adminModel.find()
          if(admins.length == 0){
            return res.status(404).json({message:" Admin not found"})  
          }
            
        } catch (error) {
          return res.status(500).json({message:"Internal Server Error",error})  
        }

        return res.status(200).send(admins)
    },

    async active(req,res){

        const activeSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required(),
            status: Joi.boolean().required()
        });

        const validate = activeSchema.validate(req.body)
        if(validate.error){
            return res.status(400).json({success: false,message: validate.error.message})
        }



        let admin;
        try {
            const {id, status} = req.body;
            admin = await adminModel.findByIdAndUpdate({_id: id}, {status}, {new: true});
            if(!admin){
                return res.status(404).json({success: false, message: 'User not found'})
            }

        } catch (error) {
            return res.status(500).json({message:"Internal Server Error",error}) 
        }

        return res.status(200).json({success: true, message: "Status updated successfully" ,status: admin.status})
    }

}





module.exports = adminController;
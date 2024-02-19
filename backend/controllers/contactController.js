const Joi = require("joi");
const ContactModel = require("../models/contact");

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

const contactController = {
    async create(req,res){

        const createSchema = Joi.object({
            email: Joi.string().email().required(),
            subject: Joi.string().required(),
            message: Joi.string().required(),
            voter: Joi.string().regex(mongodbIdRegex).required()
        });

        const validate = createSchema.validate(req.body)
        if(validate.error){
            return res.status(401).json({message:validate.error.message});
        }

        try {

            const {email, subject, message, voter} = req.body;

            const newContact = new ContactModel({
                email, subject, message, voter
            });

            await newContact.save();
            
        } catch (error) {
           return res.status(500).json({message:"Internal Server Error", error})
        }

        return res.status(201).json({message: "Your response recorded"})

    }

    
}



module.exports = contactController;
const Joi = require("joi")
const PartyModel = require("../models/party")
const bcrypt = require("bcrypt");

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

const politicalPartyController = {

    async register(req,res){

        const registerSchema = Joi.object({
            name: Joi.string().required(), 
            email: Joi.string().email().required(), 
            identification: Joi.string().required(), 
            password: Joi.string().required(),
            description: Joi.string().required()
        });

        const validate = registerSchema.validate(req.body);
        if(validate.error){
            return res.status(401).json({auth: false, message: validate.error.message});
        }

        

        try {
           
            const {name, email, identification, password,description} = req.body;

            

            const party = await PartyModel.findOne({email})
            if(party){
              return res.status(409).json({auth:false,message: "Political Party already present"})  
            }
            const hashPassword = await bcrypt.hash(password,10);

            const newParty = new PartyModel({
                name, email, identification, password: hashPassword,description
            });

            await newParty.save();

        } catch (error) {
            return res.status(500).json({auth: false, message: "Internal Server Error"});
        }
        
        return res.status(201).json({auth: true,message:"Political Party registered successfully"});
    },

    async getById(req,res){

        getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required()
        });

        const validate = getByIdSchema.validate(req.params)

        if(validate.error){
            return res.status(401).json({auth:false, message:validate.error.message});
        }

        let party;
        try {

            const {id} = req.params;  

            party = await PartyModel.findById({_id: id})
            if(!party){
                return res.status(404).json({auth:false, message:"Not Found"});
            }
            
        } catch (error) {
            return res.status(500).json({auth:false, message:"Internal Server Error",error});
        }

        return res.status(200).json({party});
    },

    async getAll(req,res){

        let parties;
        try {

          parties = await PartyModel.find();
          if(parties.length == 0){
            return res.status(404).json({message:"Not Found"})  
          }
            
        } catch (error) {
          return res.status(500).json({message:"Internal Server Error",error})  
        }

        return res.status(200).json({parties})
    },


    


}


module.exports = politicalPartyController;
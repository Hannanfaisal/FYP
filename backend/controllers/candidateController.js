const Joi = require("joi");
const CandidateModel = require("../models/candidate");


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const candidateController = {

    async register(req,res){

        const registerSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            gender: Joi.string().valid("male","female"),
            age: Joi.number().min(25).required(),
            phone: Joi.number().required(),
            position: Joi.string().required(),
            photo: Joi.string().required(),
            party: Joi.string().regex(mongodbIdPattern).required()
        });

        const validate = registerSchema.validate(req.body);

        if(validate.error){
            return res.status(400).json({auth: false, message:validate.error.message});
        }
        try {
            const {name,email,gender,age,phone,position,photo,party} = req.body;

            let newCandidate = new CandidateModel({
                name,email,gender,age, phone,position,photo,party
            });

            await newCandidate.save();

        } catch (error) {
            return res.status(500).json({auth:false, message:"Internal Server Error",error})            
        }
        return res.status(201).json({auth:true, message:"Candidate registered successfully"})
    },

    async getById(req,res){

        getByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const validate = getByIdSchema.validate(req.params)

        if(validate.error){
            return res.status(401).json({message:validate.error.message});
        }

        let candidate;
        try {

            const {id} = req.params;  

            candidate = await CandidateModel.findById({_id: id})
            if(!candidate){
                return res.status(404).json({message:"Not Found"});
            }
            
        } catch (error) {
            return res.status(500).json({auth:false, message:"Internal Server Error",error});
        }

        return res.status(200).json({candidate});
    },

    async getAll(req,res){

        let candidates;
        try {

          candidates = await CandidateModel.find();
          if(candidates.length == 0){
            return res.status(404).json({message:"Not Found"})  
          }
            
        } catch (error) {
          return res.status(500).json({message:"Internal Server Error",error})  
        }

        return res.status(200).json({candidates})
    },


    async update(req,res){

        const updateSchema = Joi.object({
            candidateId: Joi.string().regex(mongodbIdPattern).required(),
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            gender: Joi.string().valid("male","female"),
            age: Joi.number().min(25).required(),
            phone: Joi.number().required(),
            position: Joi.string().required(),
            photo: Joi.string().required(),
            party: Joi.string().regex(mongodbIdPattern).required()
        });
 
       const validate = updateSchema.validate(req.body); 
       if(validate.error){
        return res.status(401).json({message:validate.error.message});
       }
       
       try {

            
            const { candidateId, name,email,gender,age,phone,position,photo,party} = req.body;

            await CandidateModel.findByIdAndUpdate({_id:candidateId},{name,email,gender,age,phone,position,photo,party})


        } catch (error) {
            return res.status(500).json({message: "Internal Server Error",error})
        }

        return res.status(200).json({message: "Candidate updated successfully"})
    }


}


module.exports = candidateController;
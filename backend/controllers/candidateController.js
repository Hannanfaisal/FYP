const Joi = require("joi");
const CandidateModel = require("../models/candidate");
const PartyModel = require("../models/party");
const cloudinary = require("cloudinary").v2;
const {contractInstance} = require("../contracts/index")

cloudinary.config({ 
    cloud_name: 'djr9uztln', 
    api_key: '494218467926964', 
    api_secret: '2qQxooezv-aYiYrJ4S9OFEOt_qA' 
  });

const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const candidateController = {
 

    async getList (req,res){
        
    try {
        
        
        const allCandidates = await contractInstance.getVotedCandidates();
        const candidates = allCandidates.map(value => ({
          name: value.name,
          vote: parseInt(value.voteCount)
      }));
  
        return res.json({candidates});
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
  
  
    },

    async register(req,res){

        const registerSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            gender: Joi.string().valid("male","female"),
            age: Joi.number().min(25).required(),
            phone: Joi.string().required(),
            position: Joi.string().required(),
            photo: Joi.string().required(),
            party: Joi.string().regex(mongodbIdPattern).required()
        });

        const validate = registerSchema.validate(req.body);

        if(validate.error){
            return res.status(400).json({auth: false, message:validate.error.message});
        }
        let newCandidate
        try {
            const {name,email,gender,age,phone,position,photo,party} = req.body;

            // cloudinary.uploader.upload(photo)

            newCandidate = new CandidateModel({
                name,email,gender,age, phone,position,photo,party
            });

            await newCandidate.save();


        

            try{
            
            await PartyModel.updateOne({_id: party}, { $addToSet: {candidates: [newCandidate._id]}})

            }
            catch(e){
                return res.status(500).json({auth:false, message:"Party Error",error: error.message})            
            }

            const id = newCandidate._id;
            const _id = id.toString();

            const tx = await contractInstance.registerCandidate(_id, party, name);
            await tx.wait();  
            

        } catch (error) {
            console.log(error)
            return res.status(500).json({auth:false, message:"Internal Server Error",error: error.message})            
        }
        return res.status(201).json({auth:true, message:"Candidate registered successfully", candidate: newCandidate})
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

          candidates = await CandidateModel.find().populate('party')
          if(candidates.length == 0){
            return res.status(404).json({message:"Not Found"})  
          }
            
        } catch (error) {
          return res.status(500).json({message:"Internal Server Error",error})  
        }

        return res.status(200).send(candidates)
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
    },

    async approval(req,res){

        const approvalSchema  = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required(),
            approval: Joi.boolean().optional()
        });

        const validate = approvalSchema.validate(req.body);
        if(validate.error){
            return res.status(400).json({success: false, message: validate.error.message});
        }
        let candidate;
        try {
            const {id, approval} = req.body;
            
             candidate = await CandidateModel.findByIdAndUpdate({_id: id},{approval}, {new: true});
            
            if(!candidate){
                return res.status(404).json({success: false, message:'Candidate not found'});  
            }


        } catch (error) {
            return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
        }

        return res.status(200).json({success: true, message: 'Candidate approval updated', approval: candidate.approval});
    },

    async getByPartyId(req,res){

        const getByPartyIdSchema = Joi.object({
            partyId: Joi.string().regex(mongodbIdPattern).required()
        });

        const validate = getByPartyIdSchema.validate(req.params);
        if(validate.error){
            return res.status(400).json({success: false, message: validate.error.message});
        }

        let candidates;
        try {

            const {partyId} = req.params;

          candidates = await CandidateModel.find({party: partyId }).populate('party')
          if(candidates.length == 0){
            return res.status(404).json({message:"Not Found"})  
          }
            
        } catch (error) {
          return res.status(500).json({message:"Internal Server Error",error})  
        }

        return res.status(200).send(candidates)
    },

}


module.exports = candidateController;
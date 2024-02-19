const Joi = require("joi");
const VoteModel = require("../models/vote");

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

const voteController = {

    async vote(req,res){

        const voteSchema = Joi.object({
            election: Joi.string().regex(mongodbIdRegex).required(),
            candidate: Joi.string().regex(mongodbIdRegex).required(),
            party: Joi.string().regex(mongodbIdRegex).required(),
            voter: Joi.string().regex(mongodbIdRegex).required(),
        });

        const validate = voteSchema.validate(req.body);
        if(validate.error){
            return res.status(401).json({message:validate.error.message});
        }

        try {
            const {election, candidate, party, voter} = req.body;
            const vote = await VoteModel.findOne({candidate}) //needs attention
            
            if(vote){
                return res.status(405).json({message:"You have already voted"})
            }

            const newVote = new VoteModel({
                election, candidate, party, voter
            });  
            await newVote.save();
        } catch (error) {
            return res.status(500).json({message:"Internal Server Error", error}) 
        }
        return res.status(201).json({message:"Voted successfully"})
    }

};

module.exports = voteController;
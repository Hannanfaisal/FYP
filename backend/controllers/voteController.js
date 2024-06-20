const Joi = require("joi");
const {contractInstance} = require("../contracts/index")

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

const voteController = {

   async vote(req,res){

        const voteSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required()
        });

        const validate = voteSchema.validate(req.params);
        if(validate.error){
            return res.status(400).json({success: false, message: validate.error.message});
        }
        try {
            const {id} = req.params;
            const {index, voterId} = req.body;
            const tx = await contractInstance.vote(id,voterId,index);
            await tx.wait();
      
            return res.status(201).json({success: true, message: 'Vote casted successfully'})
        }
        catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }

   }




};

module.exports = voteController;
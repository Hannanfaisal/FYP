const Joi = require("joi");
const ElectionModel = require("../models/election");
const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;
const {contractInstance} = require("../contracts/index")
const mongoose = require('mongoose')

const formatDate = (_date) =>{
       
    const date = new Date(_date);

    const options = { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        hour12: true 
    };
    
    const formattedDate = date.toLocaleString('en-GB', options);
    return formattedDate

}
function convertTo12HourFormat(time24) {
    // Split the input time into hours, minutes, and seconds
    let [hours, minutes, seconds] = time24.split(':').map(Number);
    
    // Determine the period (AM/PM)
    let period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // Convert 0 to 12 for midnight
    
    // Format the hours, minutes, and seconds with leading zeros if needed
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    
    // Combine the formatted time with the period
    return `${hours}:${minutes}:${seconds} ${period}`;
}

function convertToPKT(isoDate) {
   
    let date = new Date(isoDate);
    

    let dateOptions = {
        timeZone: 'Asia/Karachi',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    
    let timeOptions = {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    };


    let dateFormatter = new Intl.DateTimeFormat('en-GB', dateOptions); 
    let timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions); 

    let formattedDate = dateFormatter.format(date).replace(/\//g, '-'); 
    let formattedTime = timeFormatter.format(date).replace(' ', '');
    
    let dateTimeInPKT = `${formattedDate} ${formattedTime}`;
    
    return dateTimeInPKT;
}




const electionController = {

    

    async create(req,res){

        const createSchema = Joi.object({
            title: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().min(Joi.ref('startDate')).required(),
            status: Joi.string().valid('not started', 'in progress','completed').required(),//default('not started'),
            parties: Joi.array().items(Joi.string().regex(mongodbIdRegex)).required(),
            candidates: Joi.array().items(Joi.string().regex(mongodbIdRegex)).required()
        
        })

        const validate = createSchema.validate(req.body);
        if(validate.error){
            return res.status(400).json({success: false, error: validate.error.message})
        }

        try {

            const {title, startDate, endDate, status, parties, candidates} = req.body;
            

            const isoStartDate = new Date(convertToPKT(startDate));
            console.log(isoStartDate)
            console.log(`Start Date: ${convertToPKT(startDate)}`)
        
        const existingElection = await ElectionModel.findOne({ startDate: startDate});
        if (existingElection) {
            return res.status(409).json({ success: false, message: "An election with this start date already exists" });
        }
            
            const election = new ElectionModel({
                title, startDate, endDate, status, parties, candidates
            });

            await election.save()


            const id = election._id;
            const _id = id.toString();
            const tx = await contractInstance.create(_id,title, candidates);
            await tx.wait();
              

        } catch (error) {
            return res.status(500).json({success: false, message: "Internal Server Error", error: error.message})
        }

        return res.status(201).json({success: true, message: "Election created successfully"})

    },

    async getAll(req,res){
       
        let elections;
        try {
            
          elections = await ElectionModel.find().sort({createdAt: -1}).populate({ path: 'candidates', options: { strictPopulate: false} }).populate({ path: 'parties', options: { strictPopulate: false} });
          if(elections.length == 0){
            return res.status(404).json({success: false, message: "Elections not found"})
          }

        } catch (error) {

            return res.status(500).json({success: false, message: "Internal Server Error", error: error.message})
        }

        return res.status(200).send(elections)
    },



async  getByPartyId(req, res) {
    const getByPartyIdSchema = Joi.object({
        id: Joi.string().regex(mongodbIdRegex).required()
    });

    const validate = getByPartyIdSchema.validate(req.params);
    if (validate.error) {
        return res.status(400).json({ success: false, message: validate.error.message });
    }

    let elections;
    try {
        const { id } = req.params;
    

        elections = await ElectionModel.find({ parties: id });
      
        if (elections.length === 0) {
            
            return res.status(404).json({ success: false, message: 'Not found' });
        }

    } catch (error) {
        
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
    return res.status(200).json({ success: true, elections });
},
    
    async status(req,res){
        
        const statusSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required(),
            status: Joi.string().valid('not started', 'in progress','completed').required()
        });

        const validate = statusSchema.validate(req.body);
        if(validate.error){
            return res.status(404).json({success: false, message: validate.error.message})
        }

        let updatedElection
        try {

            
            const {id,status} = req.body;

            updatedElection = await ElectionModel.findByIdAndUpdate({_id: id}, {status}, {new: true});

            if(!updatedElection){
                return res.status(404).json({success: false, message: 'Election not found'})
            }

            
        } catch (error) {
           return  res.status(500).json({message: 'Internal Serverv Error', error: error.message})
        }

        return res.status(200).json({success: true, status: updatedElection})
    },


    async getStatus(req,res){

        const checkStatusSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required()
        });

        const validate = checkStatusSchema.validate(req.params);
        if(validate.error){
            return res.status(404).json({success: false, message: validate.error.message})
        }

        let election;
        try{

            const {id} = req.params;
            election = await ElectionModel.findById({_id: id});
            if(!election){
                return res.status(404).json({success: false,message: 'Election not found'})
            }
        }
        catch(e){
            return  res.status(500).json({success: false,message: 'Internal Server Error', error: error.message})
        }

        return res.status(200).json({success: true, status: election.status});
    }

}

module.exports = electionController;
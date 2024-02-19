const Joi = require("joi");
const AnnouncementModel = require("../models/announcement");

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

const announcementController = {

    async create(req,res){

       const createSchema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        duration: Joi.string().required()
       });

       const validate=createSchema.validate(req.body);
       if(validate.error){
        return res.status(401).json({message: validate.error.message})
       }

       try {

        const {title, content, duration} = req.body;

        const newAnnouncement = new AnnouncementModel({
            title, content, duration
        });

        await newAnnouncement.save();

       } catch (error) {
        return res.status(500).json({message:"Internal Server Error", error})
       }

       return res.status(201).json({message:"Announement posted"})
    },

    async getAll(req,res){

          let announcements;
        try {
            
             announcements = await AnnouncementModel.find();
            if(announcements.length==0){
                return res.status(404).json({"message":"Announcements not avaiable"})
            }

        } catch (error) {
            return res.status(500).json({message:"Internal Server Error", error})
        }

        return res.status(200).json({announcements})
    },

    async delete(req,res){

        const deleteSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required()
        })

        const validate = deleteSchema.validate(req.params)
        if(validate.error){
            return res.status(401).json({message: validate.error.message});
        }
        try {
            const {id} = req.params;
            const announcement = await AnnouncementModel.findByIdAndDelete({_id: id});
            if(!announcement){
                return res.status(404).json({message:"Not Found"});
            }
        } catch (error) {
            return res.status(500).json({message: "Internal Server Error",error});
        }

        return res.status(200).json({message: "Announcement deleted"})

    }

}

module.exports = announcementController;
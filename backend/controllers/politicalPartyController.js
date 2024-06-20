const Joi = require("joi")
const PartyModel = require("../models/party")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;
const {contractInstance} = require("../contracts/index")

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
            return res.status(400).json({auth: false, message: validate.error.message});
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

                
            const id = newParty._id;
            const _id = id.toString();
           

            const tx = await contractInstance.registerParty(_id,name, email, password, description);
            await tx.wait();  
            

            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port:  587,
                secure: false,
                auth: {
                    user: '70110843@student.uol.edu.pk',
                    pass: 'jfae htrz mvla fbhp'    
                },
                });
        
                const info = await transporter.sendMail({
                    from: '"DIGIVOTE" <admin123@gmail.com>', 
                    to: `${email}`, 
                    subject: `${newParty.name} Details`, 
                    text: "Your party is registered. Password: party123gmail.com. Kindly change your passsword in order to avoid inconvenience.", // plain text body
                    html: `<div> <h2>Your party is registered.</h2> <h4 style="color: green"> Kindly note the login password of your account.</h4><h3 style="color: green">Password : ${password}</h3><p>Kindly change your password in order to avoid inconvenience.</p></div>`, // html body
                  });

                 
        

        } catch (error) {
            return res.status(500).json({auth: false, message: "Internal Server Error"});
        }
        
        return res.status(201).json({ auth: true,message:"Political Party registered successfully"});
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

            party = await PartyModel.findById({_id: id}) //.populate('candidates')
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

          parties = await PartyModel.find().populate('candidates');
          if(parties.length == 0){
            return res.status(404).json({message:"Not Found"})  
          }
            
        } catch (error) {
          return res.status(500).json({message:"Internal Server Error",error})  
        }

        return res.status(200).send(parties)
    },



    async update(req,res){

        const updateSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required(),
            name: Joi.string().required(),
            email:Joi.string().email().trim().required(),
            // identification: Joi.string().required(),
            description: Joi.string().required()
        });

        const validate = updateSchema.validate(req.body);
        if(validate.error){
            return res.status(400).json({success: false, message: validate.error.message});
        }

        let party;
        let updateParty;
        try {

            const {id,name,email, description} = req.body;

            party = await PartyModel.findOne({_id: id});

            if(!party){
                return res.status(404).json({success: false, message: 'Party not found'});
            }
            
            // const alreadyExist = await PartyModel.exists({email})
            // if(alreadyExist){
            //     return res.status(404).json({success: false, message: 'Party not found'});
            // }

          //  const hashPassword = await bcrypt.hash(password,10);

            




            updateParty = await PartyModel.updateOne({_id: id}, {name, email,description })

            
            
        } catch (error) {
            return res.status(500).json({message:"Internal Server Error", error: error.message})     
        }

        return res.status(200).json({success: true, message:"Party updated successfully"}) 
    },


    async sendMail(req,res){
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port:  587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
                user: '70110843@student.uol.edu.pk',
                pass: 'jfae htrz mvla fbhp'    
            },
            });
    
            const info = await transporter.sendMail({
                from: '"Abdul Hannan Faisal👻" <admin123@gmail.com>', // sender address
                to: "70110843@student.uol.edu.pk", // list of receivers
                subject: "Party Details", // Subject line
                text: "Your party is registered. Password: party123gmail.com. Kindly change your passsword in order to avoid inconvenience.", // plain text body
                html: "<b>Your party is registered. Password: party123gmail.com. Kindly change your passsword in order to avoid inconvenience.</b>", // html body
              });
    


          res.json(info)
        

    },

    async changePassword(req,res){

        const changePasswordSchema = Joi.object({
            id: Joi.string().regex(mongodbIdRegex).required(),
            oldPassword: Joi.string().min(10).required(),
            password: Joi.string().min(10).required()
        });

        const validate =  changePasswordSchema.validate(req.body);
        if(validate.error){
            return res.status(400).json({success: false, message: validate.error.message});
        }

        try {
            
            const {id,oldPassword, password} = req.body;

            const party = await PartyModel.findOne({_id: id});
            if(!party){
              return res.status(404).json({success: false, message:"Party not found" });
            }

            const match = await bcrypt.compare(oldPassword, party.password);

            if(!match){
             return res.status(401).json({success: false, message: "Old password does not matches"});
            }

            


            const hashPassword = await bcrypt.hash(password,10);

            const matchOldPassword = await bcrypt.compare(password, party.password )

            if(matchOldPassword){
                return res.status(404).json({success: false, message: "Password already used"});
            }

            await PartyModel.findByIdAndUpdate({_id: id}, {password: hashPassword});
          



        } catch (error) {
            res.status(500).json({success: false, message: "Internal Server Error", error: error.message});   
        }
        
        res.status(200).json({success: true, message: "Password changed successfully"});
    }

    


    


}


module.exports = politicalPartyController;
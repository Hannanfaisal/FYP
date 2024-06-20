const Joi = require("joi");
const Voter = require("../models/voter");
const adminModel = require("../models/admin");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const JWTService = require("../services/JWTService");
const PartyModel = require("../models/party");
const bcrypt = require("bcrypt");
const {contractInstance} = require("../contracts/index")


cloudinary.config({ 
    cloud_name: 'djr9uztln', 
    api_key: '494218467926964', 
    api_secret: '2qQxooezv-aYiYrJ4S9OFEOt_qA' 
  });


const mongodbIdPattern = /^[0-9a-fA-F]{24}$/;

const authController = {



    async register(req,res){

        const registerSchema = Joi.object({
            name: Joi.string().required(),
            cnic: Joi.string().min(13).max(13).required(),
            photo: Joi.string().required(),
            gender: Joi.string().required(),
            age: Joi.number().required(),
            city: Joi.string().required()
        })

        const validate = registerSchema.validate(req.body);

        if(validate.error){
            return res.status(400).json({success:false, message: validate.error.message});
        }
    
        let newVoter;
        try {

            const {name,cnic,photo, phone, gender, age, city} = req.body;

            const voter = await Voter.findOne({cnic});

            if(voter){
                return res.status(409).json({success: false, message: 'CNIC already registered'});
            }

            const uploadPhoto = await  cloudinary.uploader.upload(photo);
           
            newVoter = new Voter({name, cnic,photo: uploadPhoto.url, phone, gender, age, city});

            await newVoter.save();

            const id = newVoter._id;
            const _id = id.toString();

            const tx = await contractInstance.registerVoter(_id, name);
            await tx.wait();  

        } catch (error) {
            return res.status(500).json({success: false, message: 'Internal Server Error', error: error.message});
        }

        return res.status(201).json({succes: true, message: 'Registered Successfully', voter: newVoter})

    },


    async login(req,res){

        const loginSchema = Joi.object({
            cnic: Joi.string().length(13).required()
        });

        const validate = loginSchema.validate(req.body);
        if(validate.error){
           return res.status(400).json({success: false, message:validate.error.message})
        }

        let token;
        let user;

        try {
            const {cnic} = req.body;

            user = await Voter.findOne({cnic: cnic})

            if(!user){
                return res.status(404).json({success:false,message:'User not found'})
            }

            token = JWTService.signToken({id: user._id },'5m')



            
        } catch (error) {
            return res.status(500).json({success:false,message:'Internal Server Error'})
        }

        return res.status(200).json({success:true,message:'User login successfully',user, token})


    },

    async getAll(req,res){

        let voters;
        try {
         voters = await Voter.find();
         if(voters.length == 0){
            return res.status(404).json({success:false,message:'Voters not found'})
         }
        } catch (error) {
            return res.status(500).json({success:false,message:'Internal Server Error'})
        }
        return res.status(200).json({voters})
    },


    async getVoterById(req,res){

        const getVoterByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const validate = getVoterByIdSchema.validate(req.params);
        if(validate.error){
            return res.status(400).json({success: false, message: validate.error.message})
        }

        let voter;

        try {
           
            const {id} = req.params; 
            
            voter = await Voter.findOne({_id: id });

            if(!voter){
                return res.status(404).json({succes: false, message: "Voter not found"});
            }
        

        } catch (error) {
            return res.status(500).json({succes: false, message: "Internal Server Error", error: error.message});
        }

        return res.status(200).json({voter})
    },


   async updateCity(req,res){
    let voter;
    try {

        const {id} = req.params;
        const {city, email,p} = req.body;

       voter = await Voter.updateOne({_id:id},{phone:p}) //update({_id: id}, {phone: p}, {new: true});
        if(!voter){
            return res.status(404).json({succes: false, message: 'Not found'});
        }

        
    } catch (error) {
        return res.status(500).json({succes: false, message: 'Internal Server Error', error: error.message})
    }
    return res.status(200).json({succes: true, message: 'City updated', voter});
   },

    
    async update(req,res){
        const updateSchema = Joi.object({
            phone: Joi.string().min(11).max(12).required(),
            email: Joi.string().email().required(),
            id: Joi.string().regex(mongodbIdPattern).required()
        });

        const validate = updateSchema.validate(req.body);
        if(validate.error){
            return res.status(400).json({success: false, message: validate.error.message})
        }
        // let  updatedVoter;
        try {
            
         
            const {id, phone, email} = req.body;

             const updatedVoter = await Voter.findOneAndUpdate({_id: id}, {phone,email}, {new: true});

            if(!updatedVoter){
                return res.status(404).json({success: false, message: "Voter Not found"})
            }

        
        } catch (error) {
            return res.status(500).json({success: false, message: "Internal Server Error", error: error.message});    
        }

        return res.status(200).json({success: true, message: "Profile updated"});
    },


    async adminLogin(req,res){


        // const {email,password} = req.body

        // if(!email || !password){
        //     return res.status(401).json({message: 'Bad request'})
        // }

        // if(email == "admin123@gmail.com" && password == "password123"){
        //     return res.status(200).json({success:true,message:'User login successfully'})
        // }
        // else{
        //     return res.status(404).json({success:false,message:'User login Failed'})
        // }
        
        const adminLoginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(10).required()
        });

        const validate = adminLoginSchema.validate(req.body);
        if(validate.error){
            return res.status(401).json({ auth: false,  message: validate.error.message})
        }

        let token;
        let admin;
        try {

            const {email, password} = req.body;

             admin = await adminModel.findOne({email})
            if(!admin){
                return res.status(404).json({auth: false, message: "Not found"})
            }

            if(password != admin.password){
                return res.status(401).json({auth: false, message: "Invalid Credentials"})
            }

             token = JWTService.signToken({
                _id: admin._id
            } ,"1m");

            res.cookie('token', token, {
                maxAge: 1000 * 60 * 60 * 24,
                httpOnly: true
           })
            
            
        } catch (error) {
            return res.status(500).json({auth:false,message:'Internal Server Error'})
        }

        return res.status(200).json({auth: true,admin, message: "Admin Login Successfully", token})

    },


    async adminRegister(req,res){

        const adminRegisterSchema = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(11).max(12).required(),
            photo: Joi.string().required(),
            role: Joi.string().optional(),
            password: Joi.string().min(10).required()
        });

        const validate = adminRegisterSchema.validate(req.body)
        if(validate.error){
            return res.status(401).json({success: false, message: validate.error.message})
        }

        try {
            
            const {name,email,phone,role,photo, password} = req.body

            cloudinary.uploader.upload(photo)

            const admin = await adminModel.exists({email});
            if(admin){
                return res.status(409).json({auth: false, message: "Email already registered , use another email"})
            }

            let newAdmin = new adminModel({
                name,email,phone,photo,role, password
            });

            await newAdmin.save()

        } catch (error) {
            return res.status(500).json({auth: false, message: "Internal Server Error",error})
        }

        return res.status(201).json({auth: true, message: "Admin registered successfully"})

    },


    async getAdminById(req,res){

        const getAdminByIdSchema = Joi.object({
            id: Joi.string().regex(mongodbIdPattern).required()
        })

        const validate = getAdminByIdSchema.validate(req.params);

        if(validate.error){
            return res.status(401).json({message: validate.error.message});
        }

        let admin;

        try {
            
            const {id} = req.params;

            admin = await adminModel.findById({_id: id})

            if(!admin){
                return res.status(404).json({message:"Not Found"});
            }


        } catch (error) {
            return res.status(500).json({auth:false, message:"Internal Server Error",error});
        }

        return res.status(200).json({admin});

    },


    async logout(req,res){

        try {

            res.clearCookie("token");

            res.status(200).json({ user: null, auth: false });
            
        } catch (error) {
            
            return res.status(500).json({ message:"Internal Server Error",error})
        }

    },


    async officialLogin(req,res){
        
        const officialLoginSchema = Joi.object({
            email: Joi.string().email().trim().required(),
            password: Joi.string().min(10).trim().required()
        });

        const validate = officialLoginSchema.validate(req.body);

        if(validate.error){
            return res.status(400).json({auth: false, message: validate.error.message})
        }

        let official;
        let token;
        try {
            
           const {email, password} = req.body;

           official = await PartyModel.findOne({email});

           if(!official){
            return res.status(404).json({auth: false, message: 'Official not found'})
           }

           const match = await bcrypt.compare(password, official.password);

           

           if(!match){
            return res.status(400).json({auth: false, message: 'Incorrect Password'})
           }

           token = JWTService.signToken({id: official._id}, '5m')




        } catch (error) {
            return res.status(500).json({auth: false, message: 'Internal Server Error', error: error.message})
        }

        return res.status(200).json({auth: true, message: 'Official Login successfully',official,token})
    }








}

module.exports = authController
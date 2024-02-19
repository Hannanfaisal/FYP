const express = require("express");
const connectDB = require("./config/database");
const {PORT} = require("./config/index")
const Party = require("./models/party");
const router = require("./routes/index")
const path = require("path")
const fileUpload = require('express-fileupload');


// const multer = require("multer")

const fs = require('fs');


const app = express();


connectDB();

app.use(express.json({limit:'50mb'}));
app.use(router)
app.use(express.urlencoded({extended:false}))
app.use(fileUpload({useTempFiles: true}))

// let File;

// const upload = multer({
//     storage: multer.diskStorage({
//         destination:function(req,file,cb){
//             cb(null,"./uploads")
//         },
//         filename:function(req,file,cb){
           
//             cb(null,Date.now()+"_"+file.filename+path.extname(file.originalname))
//         }
//     })
// })


app.get("/",(req,res)=>{
    res.send("Hello World");
})

// app.post("/create", async(req,res)=>{

//     try{
//     const {name,email,description,password} = req.body;

//     if(name && email && description && password){
//         const imageBuffer = fs.readFileSync('C:\Users\IT\Downloads\bat.png');
//         const party = new Party(
//         {name,email,description,identification: imageBuffer,password}
//     );

//     await party.save()
//     }
//     else{
//         return res.status(401).send("Enter all fields");
//     }

//     }
//     catch(error){
//         console.log(`Error: ${error}`)
//     }

//     return res.status(201).send("Success, Party registered!")

// })


// app.post("/upload",upload.single("identification"),(req,res)=>{
//     res.send("File uploaded")
// })

// app.post("/create", upload.single("identification"),async(req,res)=>{

//     try{
//         let identification = req.file.filename;
//         const {name,email,description,password} = req.body;

//     if(name && email && description && password){
       
//         const party = new Party(
//         {name,email,description,identification: identification,password}
//     );

//     await party.save();

//     }
//     else{
//         return res.status(401).send("Enter all fields");
//     }

//     }
//     catch(error){
//         console.log(`Error: ${error}`)
//     }

//     return res.status(201).send("Success, Party registered!")

// })


app.post('/loginn', async (req, res) => {

    const { spawn } = require('child_process');

    console.log(`Req body is: ${req.body}`);
    const file = req.files && req.files.capturedImg;
  
    if(!file){
        return res.status(400).json({success:false,message:'Please upload image file.'})
    }
 
    console.log(req.files.capturedImg)  
    console.log(`Captured Image: ${file.tempFilePath}`)
    console.log('----')
    const pyProg = spawn('python', ['./face_recognition.py',`${file.tempFilePath}`]);
  
    let Data = null;
    
    pyProg.stdout.on('data', async function(data){
  
        Data = data.toString().trim();
      
        console.log(Data)
       
        fs.unlink(file.tempFilePath, (err) => {
          if (err) {
              console.error('Error deleting temporary file:', err);
          } else {
              console.log('Temporary file deleted successfully.');
          }
      });

    if(Data == 'True'){
      return res.status(200).json({success: true, message:'Authenicated'})
    }
    else{
      return res.status(404).json({success: false, message:'Not Authenicated'})
    }
          
    });
  
  })
  




app.listen(PORT,()=>{
    console.log(`Listening at port no. ${PORT}`);
});
const express = require("express");
const connectDB = require("./config/database");
const {PORT} = require("./config/index")
const Party = require("./models/party");
const router = require("./routes/index")
const path = require("path")
const fileUpload = require('express-fileupload');
const cors = require("cors");
const cookieParser = require("cookie-parser");

const {contractInstance} = require("./contracts/index")



const fs = require('fs');



const app = express();

app.use(cors());

app.use(cookieParser())

connectDB();

app.use(express.json({limit:'50mb'}));
app.use(router)
app.use(express.urlencoded({extended:false}))
app.use(fileUpload({useTempFiles: true}))




app.get("/",(req,res)=>{
    res.send("Hello World");
})







app.post('/verify-face', async (req, res) => {

    const { spawn } = require('child_process');

    const file = req.files && req.files.capturedImg;
  
    if(!file){
        return res.status(400).json({success:false,message:'Please upload image file.'})
    }
 
    console.log(req.files.capturedImg)  
    console.log(`Captured Image: ${file.tempFilePath}`)
    console.log('----')
    const pyProg = spawn('python', ['./face_recognition2.py',`${file.tempFilePath}`]);
  
    let Data = null;
    
    pyProg.stdout.on('data', async function(data){
  
        Data = data.toString().trim();
      
        console.log(Data)
       
      //   fs.unlink(file.tempFilePath, (err) => {
      //     if (err) {
      //         console.error('Error deleting temporary file:', err);
      //     } else {
      //         console.log('Temporary file deleted successfully.');
      //     }
      // });

    if(Data == 'True'){
      return res.status(200).json({success: true, message:'Authenicated'})
    }
    else{
      return res.status(404).json({success: false, message:'Not Authenicated'})
    }
          
    });
  
  })
  





app.get('/candidateList', async(req, res) => {   
  try {
      
      const allCandidates = await contractInstance.getAllCandidates();
      const candidates = allCandidates.map(value => ({

        id: value._id,
        name: value.name,
        vote: parseInt(value.voteCount)
    }))
      return res.json({candidates});
  }
  catch (error) {
      return res.status(500).send(error.message);
  }
});



app.get('/candidateVotedLiist', async(req, res) => {   
  try {

      // const {id} = req.params;
      
      const allCandidates = await contractInstance.getVotedCandidates();
      const candidates = allCandidates.map(value => ({
        name: value.name,
        vote: parseInt(value.voteCount)
    }));

    return res.json({votedCandidates: candidates});
  }
  catch (error) {
      return res.status(500).send(error.message);
  }
});


app.get('/candidateById/:id', async(req, res) => {   
  try {
      const id = req.params.id;
      const candidate = await contractInstance.getCandidateById(id);
      const cand = {
        name: candidate[0],
        votes: parseInt(candidate[1])
      }
  
      return res.json({candidate: cand});
  }
  catch (error) {
      return res.status(500).send(error.message);
  }
});

app.get('/partyy/:id', async(req, res) => {   
  try {
      const id = req.params.id;
      const product = await contractInstance.getParty(id);
      // let prod = []
      // prod[0] = product[0];
      // prod[1] = parseInt(product[1]);
      // prod[2] = parseInt(product[2]);
      res.json({product});
  }
  catch (error) {
      res.status(500).send(error.message);
  }
});

app.get('/parties/list', async(req, res) => {   
  try {
      
      const parties = await contractInstance.getAllParties();
      const party = parties.map((value)=>({
        id: value.id,
        
    name: value.name,
    email: value.email,
   // identification: value.identification,
    password: value.password,
    description: value.description

      }))
      res.json({parties: party});
  }
  catch (error) {
      res.status(500).send(error.message);
  }
});

app.get('/resultByElection/:id', async (req,res)=>{
  try {

    const {id} = req.params;
    const {index} = req.body;

    const rest = await contractInstance.resultByElection(id, index);
    const result = parseInt(rest);

    res.json({result});
    
  } catch (error) {
    res.status(500).send(error.message)
  }
})

app.get("/AllElections", async (req,res)=>{
  try {
    const elections = await contractInstance.getElections();
    const election = elections.map(value => ({
      id: value.id,
      name: value.name,
      candidates: value.candidateList.map(value =>({
        id: value._id,
        name: value.name,
        votes: parseInt(value.voteCount)
      }))
  }))
    res.json({elections: election});
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.get("/AllCandidates", async (req,res)=>{
  try {
    const candidates = await contractInstance.getAllCandidates();
    return res.json({candidates});
  } catch (error) {
    return res.status(500).send(error.message);
  }
})

// app.post("/vote/candidate/:id", async (req,res)=>{
//   try {
//       const {id} = req.params;
//       const {electionId} = req.body;
//       const tx = await contractInstance.vote(electionId,id);
//       await tx.wait();
//       return res.json({success: true, message: 'Vote casted successfully'})
//   }
//   catch (error) {
//       return res.status(500).send(error.message);
//   }
// })

app.get('/electionss',async (req,res)=>{
  try {
      
    const allElections = await contractInstance.getElections();
    const elections = allElections.map((value)=>({
      id: value.id,
      name: value.name,
    }))
   
    res.json({elections});
}
catch (error) {
    res.status(500).send(error.message);
}

})

app.post("/reset/:id", async (req,res)=>{
  try {

    const {id} = req.params;

    const r =  await contractInstance.resetAllCandidateVotes(id)
    res.json({r});
  } catch (error) {
    res.status(500).send(error.message);
  }
})

app.get('/result/:id', async(req, res) => {   
  try {
      const {id} = req.params;
      const rest = await contractInstance.result(id);
     const votes = parseInt(rest, 16)
      res.json({votes});
  }
  catch (error) {
      res.status(500).send(error.message);
  }
});






const port = 5000;


app.listen(port,()=>{
    console.log(`Listening at port no. ${port}`);
});
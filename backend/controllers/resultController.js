const {contractInstance} = require("../contracts/index")

const resultController = {

    async resultListByElection(req,res){
        
        try {
    
        const {id} = req.params;
    
        const result = await contractInstance.resultListByElection(id);
        const  results = result.map((value)=>({
            id: value._id,
            name: value.name,
            value: parseInt(value.voteCount)
        }))
    
        res.json({results});
        
        } catch (error) {
            return res.status(500).json({success: false, message: error.message});
        }  
  
    },

    async totalVotes (req,res){
      
            try {
          
              let count = 0;
              const {id} = req.params;
           
              const result = await contractInstance.resultListByElection(id);
             
              for (let i = 0; i < result.length; i++) {
                
                count += parseInt(result[i].voteCount);
                
              }
          
              res.status(200).json({TotalVotes: count});
              
            } catch (error) {
              return res.status(500).json({success: false, message: error.message});
            }
          
    },

    async selectedCandidate(req,res){
        
            try {
              
              const {id} = req.params;
              const candidate = await contractInstance.selectedCandidate(id);
          
              return res.json({selectedCandidate: candidate});
          
            } catch (error) {
              res.status(500).send(error.message);
            }
          
    }

}


module.exports = resultController;
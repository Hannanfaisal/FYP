

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract electionContract {


    address public  owner;




    constructor() {
        owner = msg.sender;
    }

  

    function getOwner() public  view  returns(address){
        return owner; 
    }


    struct Voter{
        string id;
        string name;
        bool voted;
    }

    mapping (string => Voter) public voters;

    function registerVoter(string memory _id, string memory _name) public {
        voters[_id] = Voter(_id,_name,false);
    }



    struct Party {
        string id;
        string name;
        string email;
        string password;
        string description;
    }

    mapping (string => Party) public parties;
    Party[] public partyArray;


    function registerParty(string memory _id, string memory _name, string memory _email, string memory _password, string memory _description) public {
        Party memory newParty = Party(_id, _name, _email, _password, _description);
        parties[_id] = newParty;
        partyArray.push(newParty);
    }



    function getParty(string memory _id) public view returns (Party memory) {
        return parties[_id];
    }

    function getAllParties() public view returns (Party[] memory) {
        return partyArray;
    }

    struct Candidate {
        string _id;
        string partyId;
        string name;
        int voteCount;
        
    }

    mapping (string => Candidate) public candidates;
    Candidate[] public candidatesList;
    Candidate[] public votedCandidateList;

    function registerCandidate(string memory _id, string memory _partyId, string memory _name) public {
        Candidate memory newCandidate = Candidate(_id,_partyId, _name, 0);
        candidates[_id] = newCandidate;
        candidatesList.push(newCandidate);
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        return candidatesList;
    }

    function getCandidateById(string memory _id) public view returns (Candidate memory) {
        return candidates[_id];
    }

    function getVotedCandidates() public view returns (Candidate[] memory) {
        return votedCandidateList;
    }

   

    

function vote(string memory _electionId,string memory _voterId, uint index) public {
    
    // if(voters[_voterId].voted == true){
    //     return;
    // }
    elections[_electionId].candidateList[index].voteCount++;

    
    string memory candidateId = elections[_electionId].candidateList[index]._id;

    candidates[candidateId].voteCount = elections[_electionId].candidateList[index].voteCount;
     voters[_voterId].voted = true;
    
    bool found = false;
    for (uint i = 0; i < votedCandidateList.length; i++) {
        if (keccak256(abi.encodePacked(votedCandidateList[i]._id)) == keccak256(abi.encodePacked(candidateId))) {
            votedCandidateList[i].voteCount = candidates[candidateId].voteCount;
            found = true;
            break;
        }
    }


    if (!found) {
        votedCandidateList.push(candidates[candidateId]);
    }
}



    struct Election {
        string id;
        string name;
        Candidate[] candidateList;
        string selectedCandidate;
    }
 
    Candidate[] public electionCandidateList;

   

    function addCandidateToElection(string  memory _id) public  {
        electionCandidateList.push(candidates[_id]);
    }

    mapping(string => Election) public elections;
    string[] public electionIds;
    Election[] public electionList;

    mapping (string => Candidate[]) votedCandidatesMapping;

    function createElection(string memory _id, string memory _name) public {



        Election storage newElection = elections[_id];
        newElection.id = _id;
        newElection.name = _name;
        newElection.selectedCandidate = "Not decleared";

        for (uint i = 0; i < candidatesList.length; i++) {
            newElection.candidateList.push(candidatesList[i]);
        }

        electionIds.push(_id);
        electionList.push(newElection);
        
    }

    function getElections() public view returns (Election[] memory) {
        return electionList;
    }

    function result(string memory _id) public view returns (int) {
        return candidates[_id].voteCount;
    }

  
    function resultByElection(string memory _id, uint index) public  view  returns (int){
        return elections[_id].candidateList[index].voteCount;
    }

    function resultListByElection(string memory _id) public view returns (Candidate[] memory){
        return elections[_id].candidateList;
    }



    // function selectedCandidate(string memory _id) public view returns (string memory) {
    //     Election storage election = elections[_id];
    //     require(election.candidateList.length > 0, "No candidates in this election");

    //     int256 maxVotes = 0;
    //     string memory selectedCandidateName = "";

    //     for (uint i = 0; i < election.candidateList.length; i++) {
    //         if (election.candidateList[i].voteCount > maxVotes) {
    //             maxVotes = election.candidateList[i].voteCount;
    //             selectedCandidateName = election.candidateList[i].name;
    //         }
    //     }



    //     return selectedCandidateName;
    // }

    
function selectedCandidate(string memory _id) public view returns (string memory) {
        Election storage election = elections[_id];
        require(election.candidateList.length > 0, "No candidates in this election");

        int256 maxVotes = election.candidateList[0].voteCount;
        string memory selectedCandidateName = election.candidateList[0].name;
        uint256 count = 1;

        for (uint i = 1; i < election.candidateList.length; i++) {
            if (election.candidateList[i].voteCount > maxVotes) {
                maxVotes = election.candidateList[i].voteCount;
                selectedCandidateName = election.candidateList[i].name;
                count = 1;
            } else if (election.candidateList[i].voteCount == maxVotes) {
                count++;
            }
        }


        if (count > 1) {
            return "Drawn";
        }

        return selectedCandidateName;
    }
  

    function getAllVotes() public view returns (int[] memory) {
    int[] memory arr = new int[](votedCandidateList.length);
    for (uint i = 0; i < votedCandidateList.length; i++) {
        arr[i] = votedCandidateList[i].voteCount;
    }
    return arr;
}


  


   function resetAllCandidateVotes(string memory _id) public {

    for (uint i = 0; i < candidatesList.length; i++) {
        candidatesList[i].voteCount = 0;
        string memory candidateName = candidatesList[i].name;
        candidates[candidateName].voteCount = 0;

         elections[_id].candidateList[0].voteCount = 0;
    }

  
    for (uint i = 0; i < votedCandidateList.length; i++) {
        votedCandidateList[i].voteCount = 0;
        string memory candidateName = votedCandidateList[i].name;
        candidates[candidateName].voteCount = 0;
    }

    
}


function create(string memory _id, string memory _name, string[] memory _candidateIds) public{

    // for (uint i = 0; i < _candidateList.length; i++) {
    //     if(_candidateList[i] == candidatesList[i]._id){
    //         electionCandidateList.push(_candidateList[i]) //require linear search
    //     }
    // }

    //   Election storage newElection = elections[_id];
    //     newElection.id = _id;
    //     newElection.name = _name;

    //     for (uint i = 0; i < candidatesList.length; i++) {
    //         newElection.candidateList.push(candidatesList[i]);
    //     }

    //     electionIds.push(_id);
    //     electionList.push(newElection);


  
    Election storage newElection = elections[_id];
    newElection.id = _id;
    newElection.name = _name;

    
    for (uint i = 0; i < _candidateIds.length; i++) {
        
        for (uint j = 0; j < candidatesList.length; j++) {
            if (keccak256(abi.encodePacked(_candidateIds[i])) == keccak256(abi.encodePacked(candidatesList[j]._id))) {
                newElection.candidateList.push(candidatesList[j]);
                break; // Candidate found, no need to check further
            }
        }
    }

    // Store the election ID and the election itself
    electionIds.push(_id);
    electionList.push(newElection);
}




}

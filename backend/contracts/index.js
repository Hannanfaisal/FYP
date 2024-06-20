const ethers = require('ethers');
require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
const signer = new ethers.Wallet('356943a0f6b475ee82a18103ad7f3a7d89bfe9c7e184f1ecdb87d758b13c064f', provider);
const {abi} = require("../artifacts/contracts/electionContract.sol/electionContract.json");


const contractInstance = new ethers.Contract('0xdCDBFCd758E8474d2Bb3994A8Cf566b9BE4b8f10', abi, signer);

//0x6f24055B50a943A426f3DAe6Bb98472e992646fa

module.exports = {
  provider,
  signer,
  contractInstance
};

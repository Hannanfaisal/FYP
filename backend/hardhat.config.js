/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.11",
   defaultNetwork: "ganache",
   networks: {
      hardhat: {},
      ganache: {
         url: "http://0.0.0.0:7545",
         accounts: [`0x${PRIVATE_KEY}`],
         gas: 6721975,
         gasPrice: 20000000000
         ,
      }
   },
}
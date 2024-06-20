const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const CONNECTION_STRING2 = process.env.CONNECTION_STRING2;
const JWT_TOKEN_KEY = process.env.JWT_TOKEN_KEY;


module.exports = {
    PORT,
    CONNECTION_STRING,
    CONNECTION_STRING2,
    JWT_TOKEN_KEY
}
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;
const CONNECTION_STRING = process.env.CONNECTION_STRING;
const CONNECTION_STRING2 = process.env.CONNECTION_STRING2


module.exports = {
    PORT,
    CONNECTION_STRING,
    CONNECTION_STRING2
}
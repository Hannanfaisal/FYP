const mongoose = require("mongoose")
const {CONNECTION_STRING, CONNECTION_STRING2} = require('./index')

const connectDB = async() =>{
    try {
        //mongodb://127.0.0.1:27017/fyp_db
       const conn = await mongoose.connect(CONNECTION_STRING2);
       console.log(`Database connection to the host: ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connectDB;





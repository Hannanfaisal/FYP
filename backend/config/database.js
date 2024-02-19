const mongoose = require("mongoose")
const {CONNECTION_STRING2} = require('./index')

const connectDB = async() =>{
    try {
        
       const conn = await mongoose.connect("mongodb://127.0.0.1:27017/fyp_db");
       console.log(`Database connection to the host: ${conn.connection.host}`);

    } catch (error) {
        console.log(`Error: ${error}`)
    }
}

module.exports = connectDB;





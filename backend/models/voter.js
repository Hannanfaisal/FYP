const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cnic:{
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});


const Voter = mongoose.model("Voter",voterSchema);
module.exports = Voter
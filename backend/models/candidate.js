const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    }, 
    photo: {
        type: String,
        required: true
    },
    party: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Party",
        required: true
    }
},{
    timestamps: true
});


const CandidateModel = mongoose.model("Candidate",candidateSchema);
module.exports = CandidateModel;
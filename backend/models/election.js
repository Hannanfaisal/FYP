const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ["","in progress","completed"],
        default: ""
    },
    parties: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Party",
        required: true
    },
    candidates: {  //should be array or not??
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Candidate",
        required: true
    }


},{
    timeseries: true
});


const Election = mongoose.model("Election",electionSchema);
module.exports = Election;
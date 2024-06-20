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
        enum: ["not started","in progress","completed"],
        required: true
        // default: "not started"
    },
    parties: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Party",
        required: true
    },
    candidates: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Candidate",
        required: true
    }
    // candidates: {
    //     type: Object,
    //     of: {
    //         type: mongoose.SchemaTypes.ObjectId,
    //         ref: 'Candidate'
    //     },
    //     required: true
    // }


},{
    timestamps: true
});


const ElectionModel = mongoose.model("Election",electionSchema);
module.exports = ElectionModel;
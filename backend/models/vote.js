const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    election: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Election",
        required: true
    },
    candidate:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Candidate",
        required: true
    },
    party: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Party",
        required: true
    },
    voter: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Voter",
        required: true
    },

},{
    timestamps: true
});

const VoteModel = mongoose.model("Vote",voteSchema);
module.exports = VoteModel;
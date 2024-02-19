const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    voter:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Voter",
        required: true
    },
    election: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Election",
        required: true
    }
},{
    timestamps: true
});


const FeedbackModel = mongoose.model("Feedback",feedbackSchema);
module.exports = FeedbackModel;
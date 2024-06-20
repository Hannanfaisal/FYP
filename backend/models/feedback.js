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
    date: {
        day: {
            type: Number,
            default: new Date().getDate()
        },
        month: {
            type: Number,
            default: new Date().getMonth() + 1, 
            min: 1,
            max: 12
        },
        year: {
            type: Number,
            default: new Date().getFullYear()
        }

    }
,    
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
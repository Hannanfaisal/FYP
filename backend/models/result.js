const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    election: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Election",
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    winners: {
        type: String,
        
    }

},{
    timestamps: true
});

const ResultModel = mongoose.model("Result",resultSchema);
module.exports = ResultModel;
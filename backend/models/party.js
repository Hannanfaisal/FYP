const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    identification: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }


},{
    timestamps: true
});


const PartyModel = mongoose.model("Party",partySchema);
module.exports = PartyModel;
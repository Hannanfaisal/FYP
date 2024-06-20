const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        day: {
            type: Number,
            default: new Date().getDay()
        },
        month:{
            type: Number,
            default: new Date().getMonth()+1,
            min: 1,
            max: 12
        },
        year: {
            type: Number,
            default: new Date().getFullYear()
        }
    },
    voter: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Voter",
        required: true
    }
},{
    timestamps: true
});


const ContactModel = mongoose.model("Contact",contactSchema);
module.exports = ContactModel;
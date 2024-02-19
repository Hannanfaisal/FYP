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
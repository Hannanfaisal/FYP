const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Administrator"
    },
    status: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
  
}, {
    timestamps: true
})



const adminModel = mongoose.model("Admin",adminSchema);
module.exports = adminModel;
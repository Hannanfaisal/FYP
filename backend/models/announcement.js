const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    // date: {},
    duration: {
        type: String,
        required: true
    }

},{
    timestamps: true
});


const AnnouncementModel = mongoose.model("Announcement",announcementSchema);
module.exports = AnnouncementModel;


















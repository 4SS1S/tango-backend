const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    magnet:    String,
    file:      String
},{
    timestamps: true,
});

module.exports = mongoose.model("Video",VideoSchema);
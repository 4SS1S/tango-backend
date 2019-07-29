const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
    season: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Season'
    },
    audio: {
        type: Array,
        required: false
    },
    episode:   Number,
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Episode",EpisodeSchema);
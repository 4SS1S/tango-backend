const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title:     String,
    genere: {
        type: Array,
        required: false
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    },
    subtitles: {
        type: Array,
        required: false
    },
    audio: {
        type: Array,
        required: false
    },
    quality: {
        type: Array,
        required: false
    },
    thumbnail: String,
    published: {
        type: Date,
        required: false
    },
    actors:    {
        type: Array,
        required: false
    },
    director:  {
        type: Array,
        required: false
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Movie",MovieSchema);
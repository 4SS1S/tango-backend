const mongoose = require('mongoose');

const SerieSchema = new mongoose.Schema({
    title: String,
    genere: {
        type: Array,
        required: false
    },
    thumbnail: String
},{
    timestamps: true,
});

module.exports = mongoose.model("Serie",SerieSchema);
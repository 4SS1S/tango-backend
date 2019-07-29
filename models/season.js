const mongoose = require('mongoose');

const SeasonSchema = new mongoose.Schema({
    serie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serie'
    },
    season: Number
},{
    timestamps: true,
});

module.exports = mongoose.model("Season",SeasonSchema);
const Movie = require('../models/video');

module.exports = {
    async video(req, res) {
        const movies = await Movie.findOne({'_id':req.params.id});

        return res.json(movies);
    },

    async create(req, res) {
        const {
            magnet,
            file
        } = req.body;

        const movie = Movie.create({
            magnet,
            file
        });

        return res.json(movie);
    }
};
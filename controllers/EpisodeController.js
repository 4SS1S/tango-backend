const Movie = require('../models/episode');

module.exports = {
    async index(req, res) {
        const movies = await Movie.find({season:req.params.season});

        return res.json(movies);
    },

    async create(req, res) {
        const {
            season,
            audio,
            video,
            episode
        } = req.body;

        const movie = Movie.create({
            season,
            audio,
            video,
            episode
        });

        return res.json(movie);
    }
};
const Movie = require('../models/movie');

module.exports = {
    async index(req, res) {
        const movies = await Movie.find().sort('-createdAt');

        return res.json(movies);
    },

    async create(req, res) {
        const {
            title,
            genere,
            video,
            subtitles,
            audio,
            quality,
            thumbnail,
            published,
            actors,
            director
        } = req.body;

        const movie = Movie.create({
            title,
            genere,
            video,
            subtitles,
            audio,
            quality,
            thumbnail,
            published,
            actors,
            director
        });

        return res.json(movie);
    }
};
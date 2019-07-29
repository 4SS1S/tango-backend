const Movie = require('../models/serie');

module.exports = {
    async index(req, res) {
        const movies = await Movie.find().sort('-createdAt');

        return res.json(movies);
    },

    async create(req, res) {
        const {
            title,
            genere,
            thumbnail
        } = req.body;

        const movie = Movie.create({
            title,
            genere,
            thumbnail
        });

        return res.json(movie);
    }
};
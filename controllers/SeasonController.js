const Movie = require('../models/season');

module.exports = {
    async index(req, res) {
        const movies = await Movie.find({serie:req.params.serie});
        return res.json(movies);
    },

    async create(req, res) {
        const {
            serie,
            season
        } = req.body;

        const movie = Movie.create({
            serie,
            season
        });

        return res.json(movie);
    }
};
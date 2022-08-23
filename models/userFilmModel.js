const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFilmSchema = new Schema({
    film_id: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    }
})

module.exports = mongoose.model('UserFilm', userFilmSchema)

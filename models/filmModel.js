const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    backdrop_path: {
        type: String,
        required: true
    },
    original_title: {
        type: String,
        required: true
    },
    title: {
        type: String,
    },
    overview: {
        type: String,
    },
    vote_average: {
        type: String,
        required: true
    },

})

module.exports = mongoose.model('Film', filmSchema)

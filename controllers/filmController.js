const Film = require('../models/filmModel');
const UserFilm = require('../models/userFilmModel');
const jwt = require('jsonwebtoken');

module.exports.create = async(req, res) => {
    if (req.cookies.jwt) {
        const {status, backdrop_path, original_title, title, overview, vote_average, id} = req.body

        const user_id = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET)
        const checkUserFilm = await UserFilm.find({film_id: id, user_id: user_id}).exec()
        if (user_id) {
            try {
                if (checkUserFilm.length == 0) {
                    await UserFilm.create({
                        film_id: id,
                        user_id: user_id,
                        status: status
                    })
                }

                const addFilm = await Film.create({
                    id: id,
                    backdrop_path: backdrop_path,
                    original_title: original_title,
                    title: title,
                    overview: overview,
                    vote_average: vote_average
                });
                
                res.json({
                    status: true,
                    message: "Film ajouté a vos favoris et en base de donnée."
                })
                
            } catch(err) {
                res.json({
                    error: err,
                    status: false,
                    message: "Film ajouté a vos favoris."
                })
            }
        } else {
            res.json({
                error: "no token provided or wrong token"
            })
        }
    }
}


// const addFilm = await Film.create({
//     id: film_id,
//     backdrop_path: backdrop_path,
//     original_title: original_title,
//     title: title,
//     overview: overview,
//     vote_average: vote_average
// });
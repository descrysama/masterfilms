const Film = require('../models/filmModel');
const UserFilm = require('../models/userFilmModel');
const jwt = require('jsonwebtoken');

module.exports.create = async(req, res) => {
    if (req.cookies.jwt) {
        const {status, poster_path, original_title, title, overview, vote_average, id} = req.body

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

                await Film.create({
                    id: id,
                    poster_path: poster_path,
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
            res.cookie("jwt", '', {
                maxAge: 1,
            }).send({
                status : true,
                message: "Erreur : suppression du cookie",
            })
            res.json({
                error: "no token provided or wrong token"
            })
        }
    } else {
        res.json({
            error: 'no token provided'
        })
    }
}


module.exports.getmyfilms = async (req, res) => {
    if (req.cookies.jwt) {
        const user_id = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET)
        const all_films = await Film.find({})
        const my_films = await UserFilm.find({user_id: user_id}).select(' -user_id -__v')
        if (user_id) {
            res.json({
                all_films: all_films,
                my_films: my_films
            })
        }
    } else {
        res.json({
            error: 'no token provided'
        })
    }
    
}
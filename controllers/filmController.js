const Film = require('../models/filmModel');
const UserFilm = require('../models/userFilmModel');
const User = require('../models/userModel');
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
                } else {
                    if(checkUserFilm[0].status != status) {
                        await UserFilm.updateOne({_id: checkUserFilm[0]._id}, {status: status})
                    }
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

module.exports.destroy = async (req, res) => {
    if (req.cookies.jwt) {
        const {id} = req.body
        const user_id = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET)
        if (user_id) {
            try {
                await UserFilm.findOneAndDelete({film_id: id, user_id: user_id})
                res.json({
                    status: true,
                    message: "Film bien supprimé."
                })
                
            } catch(err) {
                res.json({
                    error: err,
                    status: false,
                    message: "Erreur."
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

module.exports.getuserfilms = async (req, res) => {
    if (req.cookies.jwt) {
        const user = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET)
        const id = req.body.id
        if(user) {
            const user_films_id = []
            const films_id = await UserFilm.find({user_id: id})
            films_id.forEach((e) => user_films_id.push(e.film_id))
            const user_films = await UserFilm.find({user_id: id})
            const all_films = await Film.find({})
            const new_all_films = all_films.filter(film => user_films_id.includes(film.id))
            const final_list = []
            new_all_films.forEach((film) => {
                const index = user_films_id.indexOf(film.id)
                newObject = {...film._doc, status: user_films[index].status}
                final_list.push(newObject)
            })
            
            const user = await User.find({_id: id}).select({_id: 1, username: 1})

            res.json({
                username: user[0].username,
                movies: final_list
            })
        }
    } else {
        res.json({
            error: 'no token provided'
        })
    }
    
}
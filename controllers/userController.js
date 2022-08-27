const {hashPassword, comparePassword} = require('../tools/hashPassword');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


module.exports.checkToken = (req, res) => {
    const token = req.cookies.jwt ? req.cookies.jwt : null
    const id = req.cookies.jwt ? jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET) : null;
    if (token) {
        if (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
            res.json({
                status: true,
                message: "Token valide.",
                id : id
            })
        } else {
            res.json({
                status: false,
                message: "Token invalide."
            })
        }
    } else {
        res.json({
            status: false,
            message: "Token non trouvé."
        })
    }
}

module.exports.register = async(req , res) => {
    const { username, email } = req.body
    const password = hashPassword(req.body.password);
    
    try {
        const data = await User.create({
            username: username,
            email: email,
            password: password
        })
        if (data) {
            res.json({
                status: true,
                message: 'Inscription Réussie'
            })
        } else {
            res.json({
                status: false,
                error: 'Champs incorrects'
            })
        }
    } catch (error) {
        res.json({
            error: error
        })
    }
    
}

module.exports.login = async(req, res) => {
    const { email , password } = req.body;

    const user = await User.findOne({email: email});

    try {
        if (user) {
            if (comparePassword(password, user.password)) {
                const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
                const maxAge = 3 * 24 * 60 * 60 * 1000;
                res.cookie("jwt", token, {
                    httpOnly: true,
                    maxAge
                })
                
                res.status(200).json({
                    status: true,
                    message: 'Connexion Réussie, redirection...',
                    token : token
                })

            } else {
                res.json({
                    status: false,
                    message: "Email and/or password incorrect"
                })
            }
        } else {
            res.json({
                status: false,
                message: "Email and/or password incorrect"
            })
        }
    } catch(error) {
        res.json({
            error: error
        })
    }
}

module.exports.update = async (req, res) => {
    const { email, phone, birth } = req.body;
    const id = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);
    const target = await User.findById({_id: id}).exec();
    try {
        if (id && target && id == target._id) {
            target.email = email ? email : target.email
            target.phone = phone ? phone : target.phone
            target.birth = birth ? birth : target.birth
            target.save();
            res.json({
                status: "Informations mises à jour.",
                id: id,
                id2: target._id
            })
        } else{
            res.json({
                error: "Token indefinis ou incorrect."
            })
        }
    } catch(error) {
        res.json({
            error: error
        })
    }
}

module.exports.index = async (req, res) => {
    if(req.cookies.jwt) {
        const id = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.find({_id: id})
        if(user) {
            const users = await User.find().select({_id: 1, username: 1})
            res.json({
                users: users
            })
        } else {
            res.cookie("jwt", '', {
                maxAge: 1,
            })
            res.json({
                error: 'invalid token'
            })
        }

    } else {
        res.json({
            error: "no cookie"
        })
    }
}

module.exports.singleuser = async (req, res) => {
    if(req.cookies.jwt) {
        const id = jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET);
        const userid = req.body.id
        const user = await User.find({_id: userid}).select({_id: 1, username: 1})
        if(id) {
            res.json({
                user: user
            })
        } else {
            res.cookie("jwt", '', {
                maxAge: 1,
            })
            res.json({
                error: 'invalid token'
            })
        }

    } else {
        res.json({
            error: "no cookie"
        })
    }
}

module.exports.logout = (req, res) => {
    res.cookie("jwt", '', {
        maxAge: 1,
    }).send({
        status : true,
        message: "Déconnexion réussie...",
    })
}
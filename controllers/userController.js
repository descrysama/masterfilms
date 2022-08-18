const {hashPassword, comparePassword} = require('../tools/hashPassword');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


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
                data: data
            })
        } else {
            res.json({
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
                    token : token
                })

            } else {
                res.json({
                    error: "Email and/or password incorrect"
                })
            }
        } else {
            res.json({
                error: "Email and/or password incorrect"
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
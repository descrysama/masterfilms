require('dotenv').config();
const jwt = require('jsonwebtoken')

module.exports.authToken = (req, res, next) => {
    const token = req.cookies.jwt ? req.cookies.jwt : null
    if (token) {
        if (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)) {
            next()
        } else {
            res.json({
                message: 'Invalid token'
            })
        }
    } else {
        res.json({
            message: 'No token provided'
        })
    }
}


const Film = require('../models/filmModel');
const jwt = require('jsonwebtoken');


module.exports.create = async(req, res) => {
    try {
        const data = await Film.create(req.body)
        if (data) {
            res.json({
                data: data
            })
        } else {
            res.json({
                error: 'Champs incorrects'
            })
        }
    } catch(err) {
        res.json({
            error: err
        })
    }
}
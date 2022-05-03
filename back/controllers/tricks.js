
const Trick = require('../models/Trick')
const fs = require('fs')

var ObjectId = require('mongoose').Types.ObjectId; 

exports.getTricksFromUser = (req,res,next) => {

    Trick.find({user_id: req.params.id})
        .then(t => res.status(200).json(t))
        .catch(e => res.status(404).json(e))
    // Users.findOne({_id: req.params.id })
    //     .then(u => res.status(200).json(u))
    //     .catch(e => res.status(404).json(e))
    
}

exports.getAllTricks = (req,res,next) => {
    // Trick.find()
    //     .then(t => res.status(200).json(t))
    //     .catch(e => res.status(404).json(e))
}
exports.addTrick = (req, res, next) => {

    let trick = new Trick({
        user_id : req.body.params.user_id,
        platform: {
            _id: req.body.params.platform._id,
            name: req.body.params.platform.name
        },
        name : req.body.params.name,
        xp : 10, // TODO attribute XP to tricks
    })
    trick.save()
        .then(t => res.status(200).json(t))
        .catch(e => res.status(400).json(e))
    
}

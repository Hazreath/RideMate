const Platforms = require('../models/Platform')
const fs = require('fs')


exports.getPlatform = (req,res,next) => {

    Platforms.findOne({_id: req.params.id })
        .then(u => res.status(200).json(u))
        .catch(e => res.status(404).json(e))
    
}

exports.getAllPlatforms = (req,res,next) => {

    Platforms.find()
        .then(u => res.status(200).json(u))
        .catch(e => res.status(400).json(e))
}

exports.addPlatform = (req,res,next) => {

    // console.log(req.body)
    // console.log(req.body.params)
    // let platform = new Platforms({
    //     name : req.body.params.name
    // })

    // platform.save()
    // .then(p => res.status(200).json(p))
    // .catch(e => {   
    //     res.status(404).json(e)
    //     console.log(e)
    // })
}

const Trick = require('../models/Trick')
const fs = require('fs')


exports.getTricksFromUser = (req,res,next) => {
    console.log("getTricksForUser : " + req.params.id)
    console.log("")
    Trick.find({user_id: req.params.id_user})
        .then(t => res.status(200).json(t))
        .catch(e => res.status(404).json(e))
    // Users.findOne({_id: req.params.id })
    //     .then(u => res.status(200).json(u))
    //     .catch(e => res.status(404).json(e))
    
}

exports.getAllTricks = (req,res,next) => {
    console.log('trickisitiita')
}
exports.addTrick = (req, res, next) => {
    console.log('addtrick !')
    console.log(req.body)
    let trick = new Trick({
        user_id : req.body.params.user_id,
        // platform: {
        //     platform_id : req.body.params.platform_id,
        //     platform_name: req.body.params.platform_name,
        // },
        platform: {
            _id: req.body.params.platform._id,
            name: req.body.params.platform.name
        },
        name : req.body.params.name,
        xp : 10, // TODO attribute XP to tricks
    })
    console.log(trick.platform)
    trick.save()
        .then(t => res.status(200).json(t))
        .catch(e => res.status(400).json(e))
    // let username = req.body.params.username
    // let password = req.body.params.password
    // Users.findOne({ username: username})
    //     .then(user => {
            
    //         if (!user) {
               
    //             return res.status(401).json({ error : "User not found"})
    //         } else {
                
    //             return user.password === password ?
    //                 res.status(200).json({ message : "Connected successfully !"}) :
    //                 res.status(401).json({ error : "Wrong password"})
                
    //         }
    //     })
    //     .catch(e => res.status(400).json(e))
}
getAllUsers = (req,res,next) => {
    // console.log('AllUsers')
    // Users.find()
    //     .then(u => res.status(200).json(u))
    //     .catch(e => res.status(400).json(e))
}
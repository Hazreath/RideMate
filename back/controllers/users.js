const Users = require('../models/User')
const fs = require('fs')


exports.getUser = (req,res,next) => {
    console.log("getUser : " + req.params.id)
    Users.findOne({_id: req.params.id })
        .then(u => res.status(200).json(u))
        .catch(e => res.status(404).json(e))
    
}

exports.login = (req, res, next) => {
    let username = req.body.params.username
    let password = req.body.params.password
    Users.findOne({ username: username})
        .then(user => {
            
            if (!user) {
               
                return res.status(401).json({ error : "User not found"})
            } else {
                
                return user.password === password ?
                    res.status(200).json({ message : "Connected successfully !"}) :
                    res.status(401).json({ error : "Wrong password"})
                
            }
        })
        .catch(e => res.status(400).json(e))
}
getAllUsers = (req,res,next) => {
    console.log('AllUsers')
    Users.find()
        .then(u => res.status(200).json(u))
        .catch(e => res.status(400).json(e))
}
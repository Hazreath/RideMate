const Trick = require("../models/Trick");
const fs = require("fs");

var ObjectId = require("mongoose").Types.ObjectId;

exports.getTricksFromUser = (req, res, next) => {
    Trick.find({ user_id: req.params.id })
        .then((t) => res.status(200).json(t))
        .catch((e) => res.status(404).json(e));
    // Users.findOne({_id: req.params.id })
    //     .then(u => res.status(200).json(u))
    //     .catch(e => res.status(404).json(e))
};

exports.getAllTricks = (req, res, next) => {
    // Trick.find()
    //     .then(t => res.status(200).json(t))
    //     .catch(e => res.status(404).json(e))
};
exports.addTrick = (req, res, next) => {
    let trick = new Trick({
        user_id: req.body.params.user_id,
        platform: {
            _id: req.body.params.platform._id,
            name: req.body.params.platform.name,
        },
        name: req.body.params.name,
        xp: 10, // TODO attribute XP to tricks
        done: false,
    });
    trick
        .save()
        .then((t) => res.status(200).json(t))
        .catch((e) => res.status(400).json(e));
};

exports.checkTrick = (req, res, next) => {
    console.log("checked ! ");
    // console.log(req);
    // console.log("req: " + req.params._id + "\n" + req.params.user_id);
    Trick.updateOne(
        {
            $and: [
                { _id: req.body.params._id },
                { user_id: req.body.params.user_id },
            ],
        },
        { done: true }
    )
        .then((t) => {
            // console.log(res.modifiedCount);
            res.status(200).json(t);
        })
        .catch((e) => res.status(400).json(e));
};

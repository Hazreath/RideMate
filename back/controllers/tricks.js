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
    // console.log("adddddd");
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
    // console.log(trick);
    // Checking if same trick has been added (same user,name & platform)
    Trick.find({
        $and: [
            { user_id: req.body.params.user_id },
            { name: req.body.params.name },
            { "platform._id": req.body.params.platform._id },
        ],
    }).then((t) => {
        console.log(t);
        if (t.length == 0) {
            // Not in DB !
            trick
                .save()
                .then((t) => res.status(200).json(t))
                .catch((e) => res.status(400).json(e));
        } else {
            res.status(400).json({ error: "Already in DB" });
        }
    });
};

exports.checkTrick = (req, res, next) => {
    // console.log("checked ! ");
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

exports.deleteTrick = (req, res, next) => {
    console.log("delete ! ");
    console.log("req: " + req.body.params._id + "\n" + req.body.params.user_id);
    Trick.deleteOne(
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

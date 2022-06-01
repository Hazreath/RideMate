const Trick = require("../models/Trick");
const fs = require("fs");

var ObjectId = require("mongoose").Types.ObjectId;

/**
 * Send all tricks for user corresponding to user_id in req body
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 404 Not Found otherwise
 * @param {*} next forward request to next middleware
 */
exports.getTricksFromUser = (req, res, next) => {
    Trick.find({ user_id: req.params.id })
        .then((t) => res.status(200).json(t))
        .catch((e) => res.status(404).json(e));
};

/**
 * @deprecated
 * Send all tricks in DB, for test purposes only
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 404 Not Found otherwise
 * @param {*} next forward request to next middleware
 */
exports.getAllTricks = (req, res, next) => {
    // Trick.find()
    //     .then(t => res.status(200).json(t))
    //     .catch(e => res.status(404).json(e))
};

/**
 * Add trick specified in req body to DB
 * Verifies if tricks does not exists before (same tricks <=> same user_id,
 * same platform and same name)
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 400 Bad Request if error or
 * already in DB
 * @param {*} next forward request to next middleware
 */
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

/**
 * Check trick corresponding to trick_id in req body (set his done attribute to 'true')
 * Verifies that it belongs to current user
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 400 Bad Request otherwise
 * @param {*} next forward request to next middleware
 */
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

/**
 * Delete trick corresponding to trick_id in req_body in DB
 * Verifies that it belongs to current user
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 400 Bad Request otherwise
 * @param {*} next forward request to next middleware
 */
exports.deleteTrick = (req, res, next) => {
    // console.log("delete ! ");
    // console.log("req: " + req.body.params._id + "\n" + req.body.params.user_id);
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

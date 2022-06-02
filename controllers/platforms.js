const Platforms = require("../models/Platform");
const fs = require("fs");

/**
 * Send platform corresponding to supplied platform_id
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if OK, 404 (not found otherwise)
 * @param {*} next forward request to next middleware
 */
exports.getPlatform = (req, res, next) => {
    Platforms.findOne({ _id: req.params.id })
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(404).json(e));
};

/**
 * Send all platforms
 * @param {*} req http request, empty body
 * @param {*} res http response : 200 if success, 500 Internal serv error otherwise
 * @param {*} next forward request to next middleware
 */
exports.getAllPlatforms = (req, res, next) => {
    Platforms.find()
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(500).json(e));
};

/**
 * @deprecated
 * Add platform in request body to DB
 * @param {*} req http request, body in req.params
 * @param {*} res http response
 * @param {*} next forward request to next middleware
 */
exports.addPlatform = (req, res, next) => {
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
};

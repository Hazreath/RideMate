const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Settings = require("../settings");
// OPTIONS =========

exports.getUser = (req, res, next) => {
    // console.log("getUser : " + req.params.id);
    User.findOne({ _id: req.params.id })
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(404).json(e));
};

exports.login = (req, res, next) => {
    let username = req.body.params.username;
    let password = req.body.params.password;
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "User not found" });
            } else {
                bcrypt
                    .compare(password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res
                                .status(401)
                                .json({ error: "Invalid password" });
                        }
                        // let token = jwt.sign(
                        //     { userId: user._id },
                        //     Settings.SECRET_KEY,
                        //     { expiresIn: "24h" }
                        // );
                        let token = jwt.sign(
                            { userId: user._id },
                            Settings.SECRET_KEY,
                            { expiresIn: "24h" }
                        );
                        // res.set("Authorization", "Bearer " + token);
                        res.status(200).json({
                            userId: user._id,
                            token: token,
                        });
                    })
                    .catch((error) => console.log(error));
                // .catch((error) => res.status(500).json({ error }));
            }
        })
        .catch((e) => res.status(400).json(e));
};

exports.register = (req, res, next) => {
    let username = req.body.params.username;
    let password = req.body.params.password;
    let email = req.body.params.email;

    // Check if user exists, or if someone did use same email
    User.findOne({ $or: [{ username: username }, { email: email }] }).then(
        (exists) => {
            if (!exists) {
                // User creation, with encrypted pass
                bcrypt
                    .hash(password, Settings.HASH_ROUNDS)
                    .then((hashedPass) => {
                        let user = new User({
                            username: username,
                            password: hashedPass,
                            email: email,
                            level: 1,
                            xp: 0,
                        });
                        user.save()
                            .then((u) => res.status(200).json(u))
                            .catch((e) => res.status(400).json(e));
                    })
                    //res.status(500).json({ error: error })
                    .catch((error) => console.log(error));
            } else {
                // TODO A REFAIRE

                if (username == exists.username) {
                    res.status(400).json({
                        error: "Username is already taken",
                    });
                } else {
                    res.status(400).json({
                        error: "An user with same email is already registered",
                    });
                }
            }
        }
    );
    // Check if mail is used
};

exports.modifyProfile = (req, res, next) => {
    // TODO
    // console.log("modify");
    // console.log(req.body.params);
    // console.log(req.headers);
};

exports.confirmPass = (req, res, next) => {
    // TODO
    return res.status(200).json();
};
exports.modifyAvatar = (req, res, next) => {
    // TODO
    console.log("AVATAR ===========");
    // console.log(req);
    console.log(req.body);
    console.log("req.avatar: " + req.avatar);
    console.log("req.file:" + req.file);
    console.log("===================\n");
    return res.status(200).json("FINI");
};
getAllUsers = (req, res, next) => {
    console.log("AllUsers");
    Users.find()
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(400).json(e));
};

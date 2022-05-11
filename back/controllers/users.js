const User = require("../models/User");

const fs = require("fs");

exports.getUser = (req, res, next) => {
    console.log("getUser : " + req.params.id);
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
                return user.password === password
                    ? res
                          .status(200)
                          .json({ message: "Connected successfully !" })
                    : res.status(401).json({ error: "Wrong password" });
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
                let user = new User({
                    username: username,
                    password: password,
                    email: email,
                    level: 1,
                    xp: 0,
                });
                user.save()
                    .then((u) => res.status(200).json(u))
                    .catch((e) => res.status(400).json(e));
            } else {
                console.log("exists");
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

getAllUsers = (req, res, next) => {
    console.log("AllUsers");
    Users.find()
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(400).json(e));
};

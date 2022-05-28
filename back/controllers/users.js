const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Settings = require("../settings");
const AVATARS_FOLDER = "./public/avatars";
// OPTIONS =========

exports.getUser = (req, res, next) => {
    // console.log("getUser : " + req.params.id);
    User.findOne({ _id: req.params.id })
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(404).json(e));
};

exports.getAvatar = (req, res, next) => {
    let img = req.params.url;
    if (!img.includes(".")) {
        return res.status(500).json({ error: "Bad file format" });
    }
    let url = path.resolve(AVATARS_FOLDER + "/" + img);
    console.log("Sending file at " + url);
    if (!fs.existsSync(url)) {
        return res.status(500).json({ error: "File does not exists" });
    }
    return res.sendFile(url);
};
exports.login = (req, res, next) => {
    let username = req.body.params.username;
    let password = req.body.params.password;
    console.log(password);
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
    console.log("modify");
    console.log(req.body.params);
    let oldPass = req.body.params.oldPass;
    // oldPass = "aaaaaaaa";
    let userId = req.body.params.user_id;
    let newPass = req.body.params.newPass;
    // Checks that old password is valid
    User.findById(userId).then((u) => {
        bcrypt
            .compare(oldPass, u.password)
            .then((areEquals) => {
                if (areEquals) {
                    // Update password
                    bcrypt
                        .hash(newPass, Settings.HASH_ROUNDS)
                        .then((hashedPass) => {
                            User.updateOne(
                                { _id: userId },
                                { password: hashedPass }
                            )
                                .then((r) => res.status(200))
                                .catch((error) => res.status(500).json(error));
                        });
                } else {
                    res.status(401).json({
                        error: "Your current password is not correct.",
                    });
                }
            })
            .catch((err) =>
                res.status(500).json({ error: "Failed to encrypt password" })
            );
    });
    // bcrypt.compare();
    //
    // console.log(req.headers);
};

confirmPass = (req, res, next) => {
    // TODO
    return res.status(200).json();
};
exports.deleteOldAvatar = (req, res, next) => {
    console.log("----------- DELETE OLD AVATAR");
    let auth = req.headers.authorization.split(" ");
    if (auth.length > 2) {
        let userId = auth[2];
        let user = User.findOne({ _id: userId })
            .then((u) => {
                // Delete old avatar if exists
                if (
                    u &&
                    u.avatar &&
                    u.avatar != Settings.DEFAULT_AVATAR_VALUE
                ) {
                    console.log(u.avatar);
                    try {
                        let fileToDel = path.join(
                            Settings.AVATARS_FOLDER,
                            u.avatar
                        );
                        // Deletes only if file exists, does nothing otherwise
                        if (fs.existsSync(fileToDel)) {
                            fs.unlinkSync(fileToDel);
                        }
                    } catch (e) {
                        // Did not found user, or default avatar => nothing to delete
                    } finally {
                        console.log("------------------------");

                        next();
                    }
                }
            })
            .catch((error) => res.status(500).json(error));
    } else {
        return res
            .status(500)
            .json({ error: "Missing userId in authorization" });
    }
};
exports.modifyAvatar = (req, res, next) => {
    // TODO
    console.log("AVATAR ===========");
    // console.log(req);
    console.log(req.body);
    // console.log(req.body.formData.avatar);
    console.log("req.avatar: " + req.avatar);
    console.log("req.file:");
    console.log(req.file);

    let auth = req.headers.authorization.split(" ");
    if (req.file && auth.length > 2) {
        let userId = auth[2];
        // Define avatar attribute
        let extension = Settings.AVATAR_MIME_TYPES[req.file.mimetype];
        // console.log(extension);
        let newAvatar = userId + "." + extension;
        User.updateOne({ _id: userId }, { avatar: newAvatar })
            .then((u) => {
                console.log("FINITO");
                return res.status(200);
            })
            .catch((e) => res.status(500).json(e));
    } else {
        return res.status(401).json({
            error: "No image received, or missing UserId in header authorization",
        });
    }
    console.log("===================\n");
};
getAllUsers = (req, res, next) => {
    console.log("AllUsers");
    Users.find()
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(400).json(e));
};

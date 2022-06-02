const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const Settings = require("../settings");
const AVATARS_FOLDER = "./public/avatars";

const aesjs = require("aes-js");
// OPTIONS =========

/**
 * Sends user infos corresponding to user_id in req body
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 404 Not Found otherwise
 * @param {*} next forward request to next middleware
 */
exports.getUser = (req, res, next) => {
    // console.log("getUser : " + req.params.id);
    User.findOne({ _id: req.params.id })
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(404).json(e));
};

/**
 * Sends avatar laying in specified URL in req body.
 *
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 404 Not Found if no file has
 * been found,  500 if file format is incorrect
 * @param {*} next forward request to next middleware
 */
exports.getAvatar = (req, res, next) => {
    let img = req.params.url;
    if (!img.includes(".")) {
        return res.status(500).json({ error: "Bad file format" });
    }
    let url = path.resolve(AVATARS_FOLDER + "/" + img);
    console.log("Sending file at " + url);
    if (!fs.existsSync(url)) {
        return res.status(404).json({ error: "File does not exists" });
    }
    return res.sendFile(url);
};

/**
 * Authenticates currentUser if the specified password matches his.
 * Decrypt received AES password, compares it to encrypted pass in DB and then,
 * if correct, generates and sends a JWT token, that will be used to verify
 * authentification at each server request.
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 404 if user not found,
 * 500 if query or encrypting fails
 * @param {*} next forward request to next middleware
 */
exports.login = (req, res, next) => {
    let username = req.body.params.username;
    let password = req.body.params.password;
    // console.log(password);

    // Password decrypt
    let decryptedPass = AESDecrypt(password);
    // console.log("Decrypted pass: " + decryptedPass);
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            } else {
                bcrypt
                    .compare(decryptedPass, user.password)
                    .then((valid) => {
                        if (!valid) {
                            return res
                                .status(401)
                                .json({ error: "Invalid password" });
                        }
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
                    // .catch((error) => console.log(error));
                    .catch((error) => res.status(500).json({ error }));
            }
        })
        .catch((e) => res.status(500).json(e));
};

/**
 * Registers a new user in DB
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 400 if username or email is
 * already taken, 500 if encryption or request fails
 * @param {*} next forward request to next middleware
 */
exports.register = (req, res, next) => {
    let username = req.body.params.username;
    let password = req.body.params.password;
    let email = req.body.params.email;

    // console.log("REGISTER\npassword : " + password);

    // Check if user exists, or if someone did use same email
    User.findOne({ $or: [{ username: username }, { email: email }] }).then(
        (exists) => {
            if (!exists) {
                // User creation, with encrypted pass
                bcrypt
                    .hash(AESDecrypt(password), Settings.HASH_ROUNDS)
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
                    .catch((error) => {
                        res.status(500).json({ error: error });
                    });
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

/**
 * Modifies profile info for specified user.
 * Currently only modify password : check if old pass matches,
 * and then replace it by the new pass
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success, 401 if old password
 * is not matching current, 500 if encryption or request fails
 * @param {*} next forward request to next middleware
 */
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

/**
 * @deprecated
 * Check if supplied password in req body matches with corresponding user's one,
 * which corresponds to user_id specified in req body
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if success
 * @param {*} next forward request to next middleware
 */
confirmPass = (req, res, next) => {
    // TODO
    return res.status(200).json();
};

/**
 * Part of the modifyAvatar process :
 * - 1 : (You're here) Delete Old Avatar
 * - 2 : Upload new one (handled by multer)
 * - 3 : Change avatar filename in DB
 * Deletes old avatar of currentUser if he had an avatar and if the file exists
 * /!\ Current userId is in req headers due to an axios bug, that prevents another param
 * to be added to body if a file is present /!\
 * @param {*} req http request, body in req.params
 * @param {*} res http response : forward to next middleware in all cases (next=multer),
 * except if an error occured during DB request (500)
 * @param {*} next forward request to next middleware (multer)
 */
exports.deleteOldAvatar = (req, res, next) => {
    // console.log("----------- DELETE OLD AVATAR");
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
                        // console.log("------------------------");

                        next();
                    } finally {
                        // console.log("------------------------");

                        next();
                    }
                } else {
                    // No avatar or default avatar
                    if (u) {
                        // console.log("------------------------");

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

/**
 * Part of the modifyAvatar process :
 * - 1 : Delete Old Avatar
 * - 2 : Upload new one (handled by multer)
 * - 3 : (You're here) Change avatar filename in DB
 * Deletes old avatar of currentUser if he had an avatar and if the file exists
 * /!\ Current userId is in req headers due to an axios bug, that prevents another param
 * to be added to body if a file is present /!\
 * @param {*} req http request, body in req.params
 * @param {*} res http response : 200 if OK, 401 if no file or user_id is present,
 * 500 if DB query error
 * @param {*} next forward request to next middleware
 */
exports.modifyAvatar = (req, res, next) => {
    // TODO
    // console.log("AVATAR ===========");
    // // console.log(req);
    // console.log(req.body);
    // // console.log(req.body.formData.avatar);
    // console.log("req.avatar: " + req.avatar);
    // console.log("req.file:");
    // console.log(req.file);

    let auth = req.headers.authorization.split(" ");
    if (req.file && auth.length > 2) {
        let userId = auth[2];
        // Define avatar attribute
        let extension = Settings.AVATAR_MIME_TYPES[req.file.mimetype];
        // console.log(extension);
        let newAvatar = userId + "." + extension;
        User.updateOne({ _id: userId }, { avatar: newAvatar })
            .then((u) => {
                // console.log("FINITO");
                return res.status(200);
            })
            .catch((e) => res.status(500).json(e));
    } else {
        return res.status(401).json({
            error: "No image received, or missing UserId in header authorization",
        });
    }
    // console.log("===================\n");
};

/**
 * @deprecated
 * Test feature only, return all users and their infos
 * @param {*} req http request
 * @param {*} res http response : 200 if OK, 400 otherwise
 * @param {*} next forward request to next middleware
 */
getAllUsers = (req, res, next) => {
    // console.log("AllUsers");
    Users.find()
        .then((u) => res.status(200).json(u))
        .catch((e) => res.status(400).json(e));
};

/**
 * Decrypt AES encrypted argument string (hex format) into plain utf8 text
 * @param {string} toDecrypt AES Encrypted hex string to decrypt
 * @returns decrypted string, utf8 encoded
 */
function AESDecrypt(toDecrypt) {
    let encryptedBytes = aesjs.utils.hex.toBytes(toDecrypt);
    let aesCtr = new aesjs.ModeOfOperation.ctr(
        Settings.AES_KEY,
        new aesjs.Counter(Settings.AES_ROUNDS)
    );
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return decryptedText;
}

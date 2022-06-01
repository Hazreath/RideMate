const mongoose = require("mongoose");
const uniqueVal = require("mongoose-unique-validator");
const Settings = require("../settings");

/**
 * USER SCHEMA
 * Represents the RideMate user, with an unique username and email, a password,
 * a current level and xp amount, and an avatar (defined by its URL) to show people its swag :)
 *
 */
const schema = mongoose.Schema({
    // auto _id
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    xp: { type: Number, required: true },

    avatar: {
        type: String,
        required: true,
        default: Settings.DEFAULT_AVATAR_VALUE,
    },
});

schema.plugin(uniqueVal);
module.exports = mongoose.model("Users", schema);

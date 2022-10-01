const mongoose = require("mongoose");

/**
 * PLATFORM SCHEMA
 * Represents a platform, with an unique name
 * It is a platform you use to do scooter tricks (ex: Funbox, Rail...)
 */
const schema = mongoose.Schema({
    // auto _id
    date: { type: Date, required: true, unique: false },
    message: { type: String, required: true, unique: false },
    location: { type: String, required: true, unique: false },
    gravity: { type: String, required: true, unique: false },
    object: { type: String, required: false, unique: false },
});

module.exports = mongoose.model("Log", schema);

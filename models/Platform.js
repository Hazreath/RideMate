const mongoose = require("mongoose");

/**
 * PLATFORM SCHEMA
 * Represents a platform, with an unique name
 * It is a platform you use to do scooter tricks (ex: Funbox, Rail...)
 */
const schema = mongoose.Schema({
    // auto _id
    name: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Platform", schema);

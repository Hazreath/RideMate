const mongoose = require("mongoose");

const schema = mongoose.Schema({
    // auto _id
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    level: { type: Number, required: true },
    xp: { type: Number, required: true },
});

module.exports = mongoose.model("Users", schema);

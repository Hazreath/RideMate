const mongoose = require("mongoose");
const uniqueVal = require("mongoose-unique-validator");

const schema = mongoose.Schema({
    // auto _id
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    xp: { type: Number, required: true },
});

schema.plugin(uniqueVal);
module.exports = mongoose.model("Users", schema);

const mongoose = require("mongoose");

const schema = mongoose.Schema({
    // auto _id
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    platform: {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: "Platform" },
        name: { type: String, required: true },
    },

    name: { type: String, required: true },
    xp: { type: Number, required: true },
    done: { type: Boolean, required: true },
});

module.exports = mongoose.model("Trick", schema);

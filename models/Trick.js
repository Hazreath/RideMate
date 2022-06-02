const mongoose = require("mongoose");

/**
 * TRICK SCHEMA
 * Represents trick, belonging to an user, with a defined platform
 * It has a name, and XP amount that is given to owner if he checks the trick (TODO),
 * and a done status (checked -> done=true)
 *
 * Story example : User Benji registered a "quad whip" (name) in the platform "Bowl",
 * that will reward him 500 xp when landed (done status is false atm)
 */
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

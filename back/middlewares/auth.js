const jwt = require("jsonwebtoken");
const Settings = require("../settings");

/**
 * IDENTIFICATION MIDDLEWARE : Verifies that
 */
module.exports = (req, res, next) => {
    console.log("auth");
    try {
        console.log(req.headers.authorization);
        console.log(req.headers.get("Authorization"));
        const token = req.headers.authorization.split(" ")[1];
        console.log("after");
        console.log(token);
        const decodedToken = jwt.verify(token, Settings.SECRET_KEY);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID : session expired";
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: "Invalid user ID, session expired",
        });
    }
};

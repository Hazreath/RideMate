const jwt = require("jsonwebtoken");
const Settings = require("../settings");

/**
 * IDENTIFICATION MIDDLEWARE
 * Verifies that current connected user is logged in.
 * Allow the fullfilment of initial request ONLY IF userId in URL equals
 * the one contained in JWT Token.
 */
module.exports = (req, res, next) => {
    console.log("auth");
    try {
        // console.log(req.body.params);
        let expectedUserId = "";
        console.log(req.method);
        if (req.method === "GET") {
            expectedUserId = req.url.substring(1); // Strip initial '/'
        } else if (req.method === "POST") {
            expectedUserId = req.body.params.user_id;
        }
        const token = req.headers.authorization.split(" ")[1]; // Strip "Bearer ", falls into catch if undefined

        console.log("Token : " + token);
        const decodedToken = jwt.verify(token, Settings.SECRET_KEY);
        const userId = decodedToken.userId;
        console.log("Decoded user ID : " + userId);
        console.log("expected : " + expectedUserId);
        console.log("Matching : " + expectedUserId === userId);
        if (expectedUserId && expectedUserId !== userId) {
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

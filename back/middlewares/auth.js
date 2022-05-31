const jwt = require("jsonwebtoken");
const Settings = require("../settings");

/**
 * IDENTIFICATION MIDDLEWARE
 * Verifies that current connected user is logged in.
 * Allow the fullfilment of initial request ONLY IF userId in URL equals
 * the one contained in JWT Token.
 */
module.exports = (req, res, next) => {
    console.log("AUTH========================");
    // console.log(req.body);
    try {
        // console.log(req.body.params);

        let expectedUserId = "";
        let authorizationHeader = [];

        if (req.headers.authorization) {
            authorizationHeader = req.headers.authorization.split(" ");
        }
        let token = authorizationHeader[1]; // Strip "Bearer ", falls into catch if undefined
        console.log("Method: " + req.method);
        switch (req.method) {
            case "GET":
                expectedUserId = req.url.substring(1); // Strip initial '/'

                break;
            case "POST":
            // falls through
            case "PATCH":
                console.log(authorizationHeader.length);
                if (req.body.params && req.body.params.user_id) {
                    console.log("bofy");
                    expectedUserId = req.body.params.user_id;
                } else if (authorizationHeader.length > 2) {
                    // File upload : userId after token in headers authorization
                    expectedUserId = authorizationHeader[2];
                }

                break;
            case "DELETE":
                // Axios does not send header with DELETE (github #509)
                // console.log(req.body);
                // if (req.body.params) {
                //     expectedUserId = req.body.params.user_id;
                //     token = req.body.params.token;
                // }
                break;
        }

        console.log("Token : " + token);
        const decodedToken = jwt.verify(token, Settings.SECRET_KEY);
        const userId = decodedToken.userId;
        console.log("Decoded user ID : " + userId);
        console.log("expected : " + expectedUserId);
        console.log("Matching : " + (expectedUserId === userId));
        if (expectedUserId && expectedUserId !== userId) {
            throw "Invalid user ID : session expired";
        } else {
            console.log("============================");
            next();
        }
    } catch {
        console.log("============================");
        res.status(401).json({
            error: "Invalid user ID, session expired",
        });
    }
};

const Settings = require("./settings");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
// const multer = require("multer");
// const upload = multer({ dest: "public/" });
var { expressjwt: jwt } = require("express-jwt");

const usersRoutes = require("./routes/users");
const platformsRoutes = require("./routes/platforms");
const tricksRoutes = require("./routes/tricks");
const app = express();
// const port = 3001;
const port = process.env.RIDEMATE_API_PORT || 8080;

/**
 * CONNECTION TO MONGODB ATLAS DATABASE
 */
console.log(process.env.RIDEMATE_API_DB);
mongoose
    .connect(process.env.RIDEMATE_API_DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to DB !"))
    .catch((e) => console.log("Failed to connect to DB : " + e));

// middlewares
// const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3003"];
app.options("*", cors()); // include before other routes
// app.options('/*', (_, res) => {
//   res.sendStatus(200);
// });

/**
 * HEADERS MIDDLEWARE
 * Handles everything CORS RELATED
 */
app.use((req, res, next) => {
    // HEADERS
    // let req_origin = req.header("origin".toLowerCase());
    // let origin = ALLOWED_ORIGINS.includes(req_origin)
    //     ? req_origin
    //     : "http://localhost:3000";
    // console.log("orig:" + req_origin + "  /  " + origin)
    // res.setHeader("Access-Control-Allow-Origin", origin);

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json()); // req.body etc AKA. body-parser

// Default landing page
app.get(["/", "/api"], (req, res) => {
    res.sendFile("./index.html", { root: __dirname });
});

// Mouting the avatar folder as a static folder
app.use(
    "/public/avatars",
    express.static(path.join(__dirname, "public/avatars"))
);

app.use("/api/users", usersRoutes);
app.use("/api/platforms", platformsRoutes);
app.use("/api/tricks", tricksRoutes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

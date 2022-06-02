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
const port = 80;

/**
 * CONNECTION TO MONGODB ATLAS DATABASE
 */
//console.log('Connecting to MongoDB Atlas : ' + process.env.RIDEMATE_MONGODB)
mongoose
    .connect(/*Settings.DB_URL*/ process.env.RIDEMATE_MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie !"))
    .catch((e) => console.log("Connexion à MongoDB échouée ! : " + e));

// middlewares
const ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3003"];
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
    let req_origin = req.header("origin".toLowerCase());
    let origin = ALLOWED_ORIGINS.includes(req_origin)
        ? req_origin
        : "http://localhost:3000";
    // console.log("orig:" + req_origin + "  /  " + origin)
    res.setHeader("Access-Control-Allow-Origin", origin);
    // res.setHeader('Access-Control-Allow-Origin', '*'); // TODO
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

// Mouting the avatar folder as a static folder
app.use(
    "/public/avatars",
    express.static(path.join(__dirname, "public/avatars"))
);
app.use("/api/users", usersRoutes);
app.use("/api/platforms", platformsRoutes);
app.use("/api/tricks", tricksRoutes);

app.get("/api", (req, res) => {
    res.send("Hey, that works");
});
app.listen(process.env.PORT || 8080, () => {
    console.log(`App listening on port ${port}`);
});

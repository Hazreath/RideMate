const express = require("express");
const router = express.Router();
const controller = require("../controllers/tricks.js");
const auth = require("../middlewares/auth"); // TODO
// router.get('/',controller.getAllUsers)
router.get("/:id", auth, controller.getTricksFromUser);
router.get("/", auth, controller.getAllTricks);
router.post("/", auth, controller.addTrick);

module.exports = router;

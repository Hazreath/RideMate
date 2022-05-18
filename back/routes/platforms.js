const express = require("express");
const router = express.Router();
const controller = require("../controllers/platforms.js");
const auth = require("../middlewares/auth"); // TODO
router.get("/", controller.getAllPlatforms);
router.get("/:id", controller.getPlatform);

router.post("/", controller.addPlatform);

module.exports = router;

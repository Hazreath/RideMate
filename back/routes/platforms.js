const express = require("express");
const router = express.Router();
const controller = require("../controllers/platforms.js");
const auth = require("../middlewares/auth");

/**
 * PLATFORM ROUTES
 */
router.get("/", controller.getAllPlatforms);
router.get("/:id", controller.getPlatform);

// @deprecated for test purposes only
// router.post("/", controller.addPlatform);

module.exports = router;

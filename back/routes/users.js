const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.js");
const auth = require("../middlewares/auth");

// router.get('/',controller.getAllUsers)
router.get("/:id", controller.getUser);
router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/confirmPass", controller.confirmPass);
router.patch("/modifyProfile", controller.modifyProfile);

module.exports = router;

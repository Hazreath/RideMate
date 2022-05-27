const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.js");
const auth = require("../middlewares/auth");
const multer = require("multer");
// const uploadAvatar = multer({ dest: "public/avatars/" });
const uploadAvatar = require("../middlewares/multer-config");
// router.get('/',controller.getAllUsers)
router.get("/:id", controller.getUser);
router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/confirmPass", auth, controller.confirmPass);
router.patch("/modifyProfile", auth, controller.modifyProfile);
router.post(
    "/modifyProfile/avatar",
    // auth,
    // multer({ dest: "/public/avatars" }).single("avatar"),
    uploadAvatar.single("avatar"),
    controller.modifyAvatar
);
// router.patch("/modifyProfile/avatar", auth, multer, controller.modifyAvatar);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.js");
const auth = require("../middlewares/auth");
const multer = require("multer");

// MULTER MIDDLEWARE
const uploadAvatar = require("../middlewares/multer-config");

//@deprecated
// router.get('/',controller.getAllUsers)
router.get("/:id", controller.getUser);
router.get("/avatar/:url", controller.getAvatar);
router.post("/login", controller.login);
router.post("/register", controller.register);
// router.post("/confirmPass", auth, controller.confirmPass);
router.patch("/modifyProfile", auth, controller.modifyProfile);

/**
 * ModifyAvatar ROUTE
 * Auth first, then delete user's old avatar (if file exists), uploads new avatar file and
 * then modify avatar file name for user in DB
 */
router.post(
    "/modifyProfile/avatar",
    auth,

    controller.deleteOldAvatar,
    uploadAvatar.single("avatar"), // MULTER MIDDLEWARE
    controller.modifyAvatar
);
// router.patch("/modifyProfile/avatar", auth, multer, controller.modifyAvatar);

module.exports = router;

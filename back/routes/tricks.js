const express = require("express");
const router = express.Router();
const controller = require("../controllers/tricks.js");
const auth = require("../middlewares/auth"); // TODO
// router.get('/',controller.getAllUsers)

/**
 * TRICKS ROUTES
 */
router.get("/:id", auth, controller.getTricksFromUser);
router.get("/", (req, res) => {
    res.status("200").json({ message: "Back -> Tricks" });
});
// @deprecated
//router.get("/", auth, controller.getAllTricks);

router.post("/", auth, controller.addTrick);
router.patch("/check", auth, controller.checkTrick);
router.patch("/delete", auth, controller.deleteTrick);

module.exports = router;

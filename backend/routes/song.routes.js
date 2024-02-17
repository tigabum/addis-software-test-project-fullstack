const express = require("express");
const songCtrl = require("../controllers/song.controller");

const router = express.Router();

router.route("/api/songs").get(songCtrl.list);
router.route("/api/songs/:songId").get(songCtrl.read);
// lets separate creating, updating, and deleting songs , in case if we need authentication or something else...
// router.route("/api/songs/by/:userId", authentication, songCtrl.create)

router.route("/api/songs").post(songCtrl.create);
router.route("/api/songs/:songId").put(songCtrl.update).delete(songCtrl.remove);
router.param("songId", songCtrl.songByID);

module.exports = router;

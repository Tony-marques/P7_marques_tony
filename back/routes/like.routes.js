const { createLike, getAllLikes } = require("../controllers/like.controllers");
const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/createlike/:postId", auth, createLike);

router.get("/getalllikes/:postId", getAllLikes);

module.exports = router;

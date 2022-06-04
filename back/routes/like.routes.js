const {
  createLike,
  getAllLikes,
  getOneLikeOfPost,
} = require("../controllers/like.controllers");
const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/createlike/:postId&:userId", auth, createLike);

router.get("/getalllikes/:postId/:id", auth, getAllLikes);

router.get("/getonelikeofpost/:postId&:userId", getOneLikeOfPost);

module.exports = router;

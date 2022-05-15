const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
} = require("../controllers/post.controllers");
const router = express.Router();

// Récupération de tous les posts
router.get("/getallposts", getAllPosts);

router.post("/createpost", createPost);

router.delete("/deletepost/:id", deletePost);


module.exports = router;

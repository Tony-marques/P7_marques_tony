const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  getPersonnalPosts,
} = require("../controllers/post.controllers");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

// Récupération de tous les posts
router.post("/getallposts", getAllPosts);
router.post("/getpersonnalposts/:id", getPersonnalPosts);

router.post("/createpost/:id", createPost);

router.delete("/deletepost/:id", deletePost);

module.exports = router;

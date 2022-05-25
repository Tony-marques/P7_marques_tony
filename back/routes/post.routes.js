const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  getPersonnalPosts,
} = require("../controllers/post.controllers");
const auth = require("../middleware/auth.middleware");
const idPost = require("../middleware/idPost");
const multer = require("../middleware/multer");
const router = express.Router();

// Récupération de tous les posts
router.post("/getallposts", getAllPosts);
router.post("/getpersonnalposts/:id", getPersonnalPosts);

router.post("/createpost/:id", auth, multer, createPost);

router.delete("/deletepost/:id", auth, idPost, deletePost);

module.exports = router;

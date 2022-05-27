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

// Récupération de tous les posts => ok
router.post("/getallposts", auth, getAllPosts);

// Récupération des posts appartenant à l'utilisateur => ok
router.post("/getpersonnalposts/:id", auth, getPersonnalPosts);

// Créer un post => ok
router.post("/createpost/:id", auth, multer, createPost);

// Supprimer un post => ok
router.delete("/deletepost/:id", auth, idPost, deletePost);

module.exports = router;

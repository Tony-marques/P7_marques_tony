const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  getPersonnalPosts,
  updatePost,
} = require("../controllers/post.controllers");
const auth = require("../middleware/auth.middleware");
const idPost = require("../middleware/idPost");
const multer = require("../middleware/multer");
const postValid = require("../middleware/Yup/postValidation");
const router = express.Router();

// Récupération de tous les posts => ok
router.get("/getallposts/:id", auth, getAllPosts);

// Récupération des posts appartenant à l'utilisateur => ok
router.get("/getpersonnalposts/:id", auth, getPersonnalPosts);

// Créer un post => ok
router.post("/createpost/:id", auth, multer, postValid, createPost);

// Supprimer un post => ok
router.delete("/deletepost/:id", auth, idPost, deletePost);

// Mettre à jour un post => ok
router.put("/updatepost/:postId", multer, auth, idPost, postValid, updatePost);

module.exports = router;

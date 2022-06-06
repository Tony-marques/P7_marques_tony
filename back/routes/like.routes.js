const {
  createLike,
  getAllLikes,
  getOneLikeOfPost,
} = require("../controllers/like.controllers");
const express = require("express");
const auth = require("../middleware/auth.middleware");
const router = express.Router();

// Créer un commentaire => ok
router.post("/createlike/:postId&:userId", auth, createLike);

// Récupérer tous les likes d'un post => ok
router.get("/getalllikes/:postId/:id", auth, getAllLikes);

// Récupérer le like de l'utilisateur sur un post => ok
router.get("/getonelikeofpost/:postId&:id", auth, getOneLikeOfPost);

module.exports = router;

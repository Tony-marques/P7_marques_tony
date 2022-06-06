const express = require("express");
const {
  getAllComments,
  createComment,
  getCommentsByPosts,
  deleteComment,
} = require("../controllers/comment.controllers");
const auth = require("../middleware/auth.middleware");
const idComment = require("../middleware/idComment");
const commentValid = require("../middleware/Yup/commentValidation");
const router = express.Router();

// Non utilisé
router.get("/getallcomments", auth, getAllComments);

// Récupérer tous les commentaires d'un post => ok
router.get("/getcommentsbyposts/:postId/:id", auth, getCommentsByPosts);

// Créer un commentaire => ok
router.post("/createcomment/:postId", auth, commentValid, createComment);

// Supprimer un commentaire => ok
router.delete("/deletecomment/:commentId", auth, idComment, deleteComment);

module.exports = router;

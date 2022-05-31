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

router.get("/getallcomments", auth, getAllComments);

// Récupérer tous les commentaires d'un post
router.post("/getcommentsbyposts/:postId", auth, getCommentsByPosts);

router.post("/createcomment/:postId", auth, commentValid, createComment);

router.delete("/deletecomment/:commentId", auth, idComment, deleteComment);

module.exports = router;

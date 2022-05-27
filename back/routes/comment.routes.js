const express = require("express");
const {
  getAllComments,
  createComment,
  getCommentsByPosts,
  deleteComment,
} = require("../controllers/comment.controllers");
const auth = require("../middleware/auth.middleware");
const idComment = require("../middleware/idComment");
const router = express.Router();

router.get("/getallcomments", getAllComments);

router.get("/getcommentsbyposts/:postId", getCommentsByPosts);

router.post("/createcomment/:postId", createComment);

router.delete("/deletecomment/:commentId", auth, idComment, deleteComment);

module.exports = router;

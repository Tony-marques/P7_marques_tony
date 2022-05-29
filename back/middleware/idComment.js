const db = require("../models");
const CommentModel = db.comment;

module.exports = async (req, res, next) => {
  const comment = await CommentModel.findByPk(req.params.commentId);
  if (
    (comment.userId && comment.userId == req.token.userId) ||
    req.token.admin
  ) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Vous n'êtes pas le propriétaire du commentaires" });
  }
};

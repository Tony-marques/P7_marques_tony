const db = require("../models");
const PostModel = db.post;

module.exports = async (req, res, next) => {
  const post = await PostModel.findByPk(req.params.id);
  if (post.userId && post.userId == req.token.userId || req.token.admin) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Vous n'êtes pas le propriétaire du post" });
  }
};

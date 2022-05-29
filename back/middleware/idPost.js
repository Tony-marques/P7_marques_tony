const db = require("../models");
const PostModel = db.post;

module.exports = async (req, res, next) => {
  try {
    const post = await PostModel.findByPk(req.params.id || req.params.postId);
    if (post.userId && post.userId == req.token.userId) {
      switch (req.method) {
        case "PUT": {
          req.message = "Votre post a été modifié";
          next();
          break;
        }
        case "DELETE": {
          console.log("DELETE");
          req.message = "Votre post a été supprimé";
          next();
          break;
        }
      }
    } else if (req.token.admin) {
      switch (req.method) {
        case "PUT": {
          req.message = "Post modifié par un Admin";
          next();
          break;
        }
        case "DELETE": {
          req.message = "Post supprimé par un Admin";
          next();
          break;
        }
      }
    } else {
      return res
        .status(401)
        .json({ message: "Vous n'êtes pas le propriétaire du post" });
    }
  } catch (err) {}
};

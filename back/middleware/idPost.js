const db = require("../models");
const PostModel = db.post;

// Middleware qui permet de vérifier si le userId du post est égal au userId du token et selon la méthode HTTP
// Ou si c'est un admin
module.exports = async (req, res, next) => {
  try {
    const post = await PostModel.findByPk(req.params.id || req.params.postId);
    if (post.userId && post.userId == req.token.userId) {
      switch (req.method) {
        case "PUT": {
          // Si propriétaire du post et méthode PUT stock ce message dans la req
          req.message = "Votre post a été modifié";
          next();
          break;
        }
        case "DELETE": {
          // Si propriétaire du post et méthode DELETE stock ce message dans la req
          req.message = "Votre post a été supprimé";
          next();
          break;
        }
      }
    } else if (req.token.admin) {
      switch (req.method) {
        case "PUT": {
          // Si admin et méthode PUT stock ce message dans la req
          req.message = "Post modifié par un Admin";
          next();
          break;
        }
        case "DELETE": {
          // Si admin et méthode DELETE stock ce message dans la req
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

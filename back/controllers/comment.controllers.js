const db = require("../models");
const CommentModel = db.comment;
const UserModel = db.user;
const PostModel = db.post;

// Créer un commentaire
exports.createComment = (req, res) => {
  PostModel.findByPk(req.params.postId).then((post) => {
    //
    CommentModel.create({ ...req.body, postId: post.id })
      .then(() => {
        return res.status(201).json({ msg: "Commentaires créé avec succès !" });
      })
      .catch(() => {
        return res.status(500).json({ msg: "Commentaires non créé !" });
      });
  });
};

exports.getAllComments = (req, res) => {
  CommentModel.findAll({
    include: [
      {
        model: UserModel,
        attributes: ["name", "lastname", "id", "admin", "age"],
      },
    ],
  })
    .then((comments) => {
      return res.status(200).json(comments);
    })
    .catch((err) => res.status(500).json(err));
};

exports.getCommentsByPosts = (req, res) => {
  CommentModel.findAll({
    where: {
      postId: req.params.postId,
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: UserModel,
        attributes: ["name", "id", "lastname", "age", "image"],
      },
    ],
  })
    .then((comments) => {
      return res.status(200).json({ comments });
    })
    .catch((error) => {
      return res.status(401).json({ error });
    });
};

exports.deleteComment = (req, res) => {
  CommentModel.destroy({
    where: {
      id: req.params.commentId,
    },
  })
    .then(() => {
      return res.status(200).json({ msg: "Commentaire supprimé." });
    })
    .catch(() => {
      return res.status(401).json({ msg: "Commentaire non supprimé." });
    });
};

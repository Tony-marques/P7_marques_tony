const db = require("../models");
const PostModel = db.post;
const UserModel = db.user;
const fs = require("fs");

exports.getAllPosts = (req, res) => {
  PostModel.findAll({
    // attributes: ["id", "author", "content", "userid"],
    include: [
      {
        model: UserModel,
        attributes: ["name", "lastname", "id", "admin", "age", "image"],
      },
    ],
  })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) => res.status(500).json(err));
};

exports.getPersonnalPosts = (req, res) => {
  PostModel.findAll({
    where: {
      userId: req.params.id,
    },
    include: [
      {
        model: UserModel,
        required: true,
        attributes: ["name", "lastname", "id", "admin"],
      },
    ],
  }).then((posts) => {
    return res.status(200).json(posts);
  });
};

exports.createPost = (req, res) => {
  const { content } = req.body;
  UserModel.findByPk(req.params.id)
    .then((user) => {
      PostModel.create({
        // author: `${user.name} - ${user.lastname}`,
        content,
        image: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : null,
        userId: req.params.id,
      })
        .then(() => {
          return res.status(201).json({ message: "post créé avec succès !" });
        })
        .catch(() => {
          return res.status(500).json({ message: "post non créé !" });
        });
    })
    .catch(() => res.status(401).json());
};

exports.deletePost = (req, res) => {
  // S'il y a une image dans le post, il faut d'abord supprimé l'image du backend
  PostModel.findOne({ where: { id: req.params.id } }).then((post) => {
    if (post.image) {
      const filename = post.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        PostModel.destroy({ where: { id: req.params.id } })
          .then(() => res.status(200).json({ msg: req.message }))
          .catch((error) => res.status(400).json({ error }));
      });
    } else {
      // S'il n'y a pas d'image
      PostModel.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ msg: req.message }))
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

exports.updatePost = (req, res) => {
  const { postId } = req.params;
  PostModel.findOne({
    where: {
      id: postId,
    },
  })
    .then((post) => {
      post.update({
        ...req.body,
        userId: post.userId,
        image: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : post.image,
      });
    })
    .then(() => {
      return res.status(200).json({ msg: req.message });
    })
    .catch((err) => res.status(401).json(err));
};

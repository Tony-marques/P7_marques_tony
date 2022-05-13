// const PostModel = require("../models/post.model");
// const UserModel = require("../models/user.model");

const db = require("../models");
const PostModel = db.post;
const userModel = db.user;

exports.getAllPosts = (req, res) => {
  // PostModel.findAll({
  //   attributes: [],
  //   include: [{ model: UserModel, attributes: ["name"] }],
  // });
  PostModel.findAll()
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) => res.status(500).json(err));
};

exports.createPost = (req, res) => {
  const { author, content, userId } = req.body;
  console.log(req.body);
  console.log(content);
  PostModel.create({
    author,
    content,
    userId,
  })
    .then(() => {
      return res.status(201).json({ message: "post créé avec succès !" });
    })
    .catch(() => {
      return res.status(500).json({ message: "post non créé !" });
    });
};

exports.deletePost = (req, res, next) => {
  console.log(req.params.id);
  PostModel.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Message supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

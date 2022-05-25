// const PostModel = require("../models/post.model");
// const UserModel = require("../models/user.model");

const db = require("../models");
const PostModel = db.post;
const UserModel = db.user;

exports.getAllPosts = (req, res) => {
  PostModel.findAll({
    // attributes: ["id", "author", "content", "userid"],
    include: [
      {
        model: UserModel,
        attributes: ["name", "lastname", "id", "admin", "age"],
      },
    ],
  })
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) => res.status(500).json(err));

  // PostModel.findAll()
  //   .then((posts) => {
  //     return res.status(200).json(posts);
  //   })
  //   .catch((err) => res.status(500).json(err));
};

exports.getPersonnalPosts = (req, res) => {
  console.log(req.params.id);
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
  console.log(req.file);
  const { author, content, userId } = req.body;
  UserModel.findByPk(req.params.id)
    .then((user) => {
      // ref.file ? :
      PostModel.create({
        author:
          user.name && user.lastname
            ? user.name + " " + user.lastname
            : user.email,
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

exports.deletePost = (req, res, next) => {
  console.log(req.token);
  PostModel.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Message supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

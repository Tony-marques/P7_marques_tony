const db = require("../models");
const UserModel = db.user;
const PostModel = db.post;
const LikeModel = db.like;

exports.createLike = async (req, res) => {
  try {
    let existingLike = await LikeModel.findOne({
      where: { postId: req.params.postId, userId: req.params.userId },
    });
    // si user a déjà liké, supprimer le like
    if (existingLike) {
      await existingLike.destroy();
      res
        .status(200)
        .json({ message: "vous avez déjà liké ce post, like supprimé!" });
    }
    // sinon, ajouter le like
    else {
      await LikeModel.create({
        postId: req.params.postId,
        userId: req.params.userId,
      });
      res.status(201).json({ message: "Like ajouté!" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getAllLikes = (req, res) => {
  LikeModel.findAll({
    where: { postId: req.params.postId },
    include: [
      {
        model: PostModel,
        attributes: ["id"],
        include: [{ model: UserModel, attributes: ["id"] }],
      },
    ],
  })
    .then((likes) => {
      return res.status(200).json(likes);
    })
    .catch(() => {});
};

exports.getOneLikeOfPost = (req, res, next) => {
  LikeModel.findOne({
    where: { postId: req.params.postId, userId: req.params.id },
    // include: UserModel,
  })
    .then((like) => res.status(200).json({ like }))
    .catch((error) => res.status(404).json({ error }));
};

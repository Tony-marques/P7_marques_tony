const db = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = db.user;

exports.signIn = (req, res) => {
  const { password, email, name, lastname } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({
        email: email,
        password: hash,
        admin: false,
        name: name,
        lastname: lastname,
        bio: "",
      })
        .then(() => res.status(201).json({ msg: "Utilisateur créé" }))
        .catch((err) => res.status(500).json({ msg: "Utilisateur non créé" }));
    })
    .catch((err) => res.status(500).json(err));
};

exports.login = (req, res) => {
  UserModel.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        res.status(401).json({ msg: "Adresse e-mail incorrecte" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            res.status(401).json({ msg: "Mot de passe incorrect" });
          } else {
            const token = jwt.sign(
              { userId: user.id, admin: user.admin, name: user.name },
              process.env.SECRET_KEY,
              {
                expiresIn: "24h",
              }
            );
            res.status(200).json({
              userId: user.id,
              token: token,
            });
          }
        });
      }
    })
    .catch((error) => res.status(401).json(error));
};

exports.getOneProfil = (req, res) => {
  UserModel.findByPk(req.params.id, {
    attributes: ["id", "name", "lastname", "age", "admin", "bio", "image"],
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(401).json("erreur"));
};

exports.getAllUsers = (req, res) => {
  UserModel.findAll({
    attributes: ["admin", "age", "bio", "email", "id", "name", "lastname"],
  }).then((users) => res.status(200).json(users));
};

exports.updateProfil = (req, res) => {
  console.log(req.body);
  UserModel.findByPk(req.params.id).then((user) => {
    user
      .update({
        ...req.body,
        image: req.file
          ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
          : "",
      })
      .then((newUser) => res.status(201).json({ newUser }))
      .catch((err) => {
        res.status(401).json({ msg: "Profil non mise à jour." });
      });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  UserModel.findOne({
    where: {
      id: id,
    },
  }).then((user) => {
    user.destroy().then(() => {
      return res
        .status(200)
        .json({ msg: "Le compte a été supprimé avec succès !" });
    });
  });
};

exports.deleteMyProfil = (req, res) => {
  const { id } = req.params;
  UserModel.findByPk(id).then((user) => {
    user.destroy();
  });
};

exports.toggleAdmin = (req, res) => {
  UserModel.findByPk(req.params.id).then((user) => {
    user
      .update({ ...req.body })
      .then((newUser) => res.status(201).json({ newUser }));
  });
};

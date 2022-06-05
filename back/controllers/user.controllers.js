const db = require("../models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = db.user;

exports.signUp = (req, res) => {
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
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
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
                token: token, // et
              });
            }
          })
          .catch((err) => {
            return res.status(401).json(err);
          });
      }
    })
    .catch((error) => res.status(401).json(error));
};

// Récupérer les infos du user connecté =>
exports.getOneProfil = (req, res) => {
  UserModel.findByPk(req.params.id, {
    attributes: ["id", "name", "lastname", "age", "admin", "bio", "image"],
  })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(401).json("erreur"));
};

// Récupérer tous les utilisateurs
exports.getAllUsers = (req, res) => {
  UserModel.findAll({
    attributes: [
      "admin",
      "age",
      "bio",
      "email",
      "id",
      "name",
      "lastname",
      "image",
    ],
  })
    .then((users) => res.status(200).json(users))
    .catch((err) => {
      return res.status(400).json({ msg: "Utilisateurs non trouvés" });
    });
};

// Mettre à jour son profil => fonction ok
exports.updateProfil = (req, res) => {
  UserModel.findByPk(req.params.id)
    .then((user) => {
      const userPhoto = user.image;
      // Si le user à déjà une photo de profil, on la supprime
      if (req.file && userPhoto) {
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          user
            .update({
              name: req.body.name,
              lastname: req.body.lastname,
              bio: req.body.bio,
              age: req.body.age,
              image: req.file
                ? `${req.protocol}://${req.get("host")}/images/${
                    req.file.filename
                  }`
                : "",
            })
            .then((newUser) => res.status(201).json({ newUser }))
            .catch((err) => {
              res.status(401).json({ msg: "Profil non mise à jour." });
            });
        });
      } else {
        // Si le user n'a pas encore de photo de profil
        user
          .update({
            name: req.body.name,
            lastname: req.body.lastname,
            bio: req.body.bio,
            age: req.body.age,
            image: req.file
              ? `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
                }`
              : "",
          })
          .then((newUser) => res.status(201).json({ newUser }))
          .catch((err) => {
            res.status(401).json({ msg: "Profil non mise à jour." });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Profil non trouvé" });
    });
};

// Supprimer un compte en étant admin => function ok
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  UserModel.findOne({
    where: {
      id: id,
    },
  })
    .then((user) => {
      const userPhoto = user.image;
      if (userPhoto) {
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          user
            .destroy()
            .then(() => {
              return res
                .status(200)
                .json({ msg: "Le compte a été supprimé avec succès !" });
            })
            .catch((err) => {
              return res.status(401).json({ msg: "Compte non supprimé" });
            });
        });
      } else {
        user
          .destroy()
          .then(() => {
            return res
              .status(200)
              .json({ msg: "Le compte a été supprimé avec succès !" });
          })
          .catch((err) => {
            return res.status(401).json({ msg: "Compte non supprimé" });
          });
      }
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Compte non trouvé" });
    });
};

// Supprimer son compte => function ok
exports.deleteMyProfil = (req, res) => {
  const { id } = req.params;

  UserModel.findByPk(id)
    .then((user) => {
      const userPhoto = user.image;
      if (userPhoto) {
        // si il y a une photo de profil,
        // Supprimer l'image de profil du user
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          user.destroy();
        });
      } else {
        // Si pas de photo de profil
        user.destroy();
      }
    })
    .catch((err) => {
      return res.status(400).json({ msg: "Utilisateur non trouvé" });
    });
};

// Changer le status d'un compte => function ok
exports.toggleAdmin = (req, res) => {
  UserModel.findByPk(req.params.id, {
    attributes: ["admin", "id"],
  })
    .then((user) => {
      user
        .update({ ...req.body })
        .then((newUser) => res.status(201).json({ newUser }))
        .catch((err) => {
          return res.status(401).json({ msg: "Utilisateur non mis à jour" });
        });
    })
    .catch((err) => {
      return res.status(401).json({ msg: "Utilisateur non trouvé" });
    });
};

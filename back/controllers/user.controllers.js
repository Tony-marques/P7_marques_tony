const db = require("../models");
// const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = db.user;

exports.signIn = (req, res) => {
  const { password, email } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModel.create({
        email: email,
        password: hash,
        admin: false,
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
        res.status(401).json({ msg: "Utilisateur non trouvé" });
      } else {
        bcrypt.compare(req.body.password, user.password).then((valid) => {
          if (!valid) {
            res.status(401).json({ msg: "Mot de passe incorrect" });
          } else {
            const token = jwt.sign(
              { userId: user.id, admin: user.admin },
              "RANDOM_SECRET_KEY",
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
  console.log(req.params.id);
  UserModel.findByPk(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(401).json("erreuerrrrr"));
};

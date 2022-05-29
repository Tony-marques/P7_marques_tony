const express = require("express");
const router = express.Router();
const {
  login,
  signIn,
  getOneProfil,
  updateProfil,
  getAllUsers,
  deleteUser,
  deleteMyProfil,
  toggleAdmin,
} = require("../controllers/user.controllers");
const auth = require("../middleware/auth.middleware");
const checkAdmin = require("../middleware/checkAdmin");
const idUser = require("../middleware/idUser");
const isEmail = require("../middleware/isEmail");
const multer = require("../middleware/multer");

// Connexion // remettre isEmail
router.post("/login", login);

// Création de compte // remettre isEmail
router.post("/signin", signIn);

// Obtenir son propre profil => ok
router.get("/getoneprofil/:id", auth, getOneProfil);

// Obtenir tous les users => ok
router.post("/getallusers", auth, checkAdmin, getAllUsers);

// Mettre à jour son profil => 
router.put("/updateuser/:id",  multer, updateProfil);

// Changer le status admin => ok
router.put("/toggleadmin/:id", auth, checkAdmin, toggleAdmin);

// Supprimer un user => ok
router.delete("/deleteuser/:id", auth, checkAdmin, deleteUser);

// Supprimer son profil / compte => ok
router.delete("/deletemyprofil/:id", auth, idUser, deleteMyProfil);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  login,
  signUp,
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
const multer = require("../middleware/multer");
const rateLimit = require("../middleware/rateLimit");
const loginValid = require("../middleware/Yup/loginValidation");
const registerValid = require("../middleware/Yup/registerValidation");
const updateProfilValidation = require("../middleware/Yup/updateProfilValidation");

// Création de compte
router.post("/signup", rateLimit, registerValid, signUp);

// Connexion
router.post("/login", rateLimit, loginValid, login);

// Obtenir son propre profil => ok
router.get("/getoneprofil/:id", auth, getOneProfil);

// Obtenir tous les users => ok
router.get("/getallusers/:id", auth, checkAdmin, getAllUsers);

// Mettre à jour son profil => ok
router.put(
  "/updateuser/:id",
  auth,
  idUser,
  multer,
  updateProfilValidation,
  updateProfil
);

// Changer le status admin => ok
router.put("/toggleadmin/:id", auth, checkAdmin, toggleAdmin);

// Supprimer un user => ok
router.delete("/deleteuser/:id", auth, checkAdmin, deleteUser);

// Supprimer son profil / compte => ok
router.delete("/deletemyprofil/:id", auth, idUser, deleteMyProfil);

module.exports = router;

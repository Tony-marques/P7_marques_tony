const express = require("express");
const router = express.Router();
const {
  login,
  signIn,
  getOneProfil,
} = require("../controllers/user.controllers");

// Route connexion
router.post("/login", login);

// Route création de compte
router.post("/signin", signIn);

//
router.get("/getoneprofil/:id", getOneProfil);

module.exports = router;

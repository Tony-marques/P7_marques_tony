const express = require("express");
const router = express.Router();
const {
  login,
  signIn,
  getOneProfil,
  updateProfil,
  getAllUsers,
  deleteUser,
} = require("../controllers/user.controllers");

// Route connexion
router.post("/login", login);

// Route création de compte
router.post("/signin", signIn);

//
router.get("/getoneprofil/:id", getOneProfil);

router.get("/getallusers", getAllUsers);

router.put("/updateuser/:id", updateProfil);

router.delete("/deleteuser/:id", deleteUser);

module.exports = router;

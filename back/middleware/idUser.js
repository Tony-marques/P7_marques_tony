const db = require("../models");
const UserModel = db.user;

// Middleware qui permet de vérifier si le userId = au userId du token
module.exports = async (req, res, next) => {
  const user = await UserModel.findByPk(req.params.id);
  if (user && user.id && user.id == req.token.userId) {
    next();
  } else {
    return res
      .status(401)
      .json({ message: "Suppression impossible" });
  }
};

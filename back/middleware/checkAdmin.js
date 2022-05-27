module.exports = (req, res, next) => {
  try {
    if (req.token.admin) {
      next();
    } else {
      throw new Error("Vous n'êtes pas admin");
    }
  } catch (err) {
    return res.status(401).json({ message: "Requête non authentifiée" });
  }
};

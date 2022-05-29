const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // on vérifie que le token est présent et valide
    const token = req.headers.authorization.split(" ")[1];
    req.token = jwt.verify(token, process.env.SECRET_KEY);
    console.log(req.body);
    console.log(req.file);
    console.log(token);
    /* si le corps de la requête contient un UserId on vérifie qu'il correspond au
    USER_ID contenu dans le payload du token */
    if (
      (req.body.userId && req.body.userId == req.token.userId) ||
      (req.params.id && req.params.id == req.token.userId)
    ) {
      next();
    } else {
      throw new Error("User Id non valable");
    }
  } catch (err) {
    return res.status(401).json({ message: "Requête non authentifiée" });
  }
};

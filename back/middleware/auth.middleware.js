const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   console.log(req.headers);
//   // try{
//   //   const token = req.headers.authorization.split(" ")[1];
//   //   const decodedToken = jwt.verify(token, "RANDOM_SECRET_KEY");
//   //   const userId = decodedToken.userId
//   //   console.log(userId);
//   // } catch(err){
//   //   console.log("err");
//   // }
//   // if (req.body.UserId && req.body.UserId == userId) {
//   //   req.userId = userId;
//   //   console.log("true");
//   //   next();
//   // } else {
//   //   console.log("false");
//   //   // throw new Error("User Id non valable");
//   //   return res.status(401).json({ message: "Non autorisé !" });
//   // }
// };

module.exports = (req, res, next) => {
  try {
    // on vérifie que le token est présent et valide
    const token = req.headers.authorization.split(" ")[1];
    req.token = jwt.verify(token, "RANDOM_SECRET_KEY");
    /* si le corps de la requête contient un UserId on vérifie qu'il correspond au
    USER_ID contenu dans le payload du token */
    if (req.body.userId && req.body.userId !== req.token.userId) {
      throw new Error("User Id non valable");
    } else {
      next();
    }
  } catch (err) {
    return res.status(401).json({ message: "Requête non authentifiée" });
  }
};

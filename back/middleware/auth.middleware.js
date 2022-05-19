const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  req.token = jwt.verify(token, "RANDOM_SECRET_KEY");
  console.log(req.body);
  console.log(req.token);
  next();
};

const validator = require("validator");

module.exports = (req, res, next) => {
  const { email } = req.body;
  if (validator.isEmail(email)) {
    next();
  } else {
    return res
      .status(401)
      .json({ error: `Le format de l'email n'est pas respecté` });
  }
};

const validator = require("validator");

module.exports = (req, res, next) => {
  const { email } = req.body;
  if (validator.isEmail(email)) {
    next();
  } else {
    return res
      .status(401)
      .json({ error: `Merci de renseigner une adresse e-mail valide` });
  }
};

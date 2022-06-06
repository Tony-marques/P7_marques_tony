const rateLimit = require("express-rate-limit");

// Permet de limiter le nombre de tentative de connexion
const minutes = 15;
module.exports = rateLimit({
  windowsMs: 15 * 60 * 1000,
  max: 10,
  message: `trop de tentative, veuillez attendre ${minutes} minutes`,
});

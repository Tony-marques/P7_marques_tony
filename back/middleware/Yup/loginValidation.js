// LIBRARIES
const yup = require("yup");

// regex pour les noms et prénoms
const namesRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s'.-]+$/;
// regex pour les caractères interdits
const forbiddenChars = /[$<>;]/;

// schéma yup pour les données d'une inscription
const loginSchema = yup.object().shape({
  password: yup
    .string()
    .required("Le mot de passe est requis")
    .trim()
    .min(6, `Veuillez mettre au minimum 6 caractères`)
    .matches(/[a-z]/, "Le mot de passe doit contenir au moins 1 minuscule")
    .matches(/[A-Z]/, "Le mot de passe doit contenir au moins 1 majuscule")
    .matches(/[0-9]/, "Le mot de passe doit contenir au moins 1 chiffre"),

  email: yup
    .string()
    .trim()
    .required("L'émail est requis")
    .email("L'email n'est pas valide"),
});

// application du schéma pour la validation ou non
const loginValid = async (req, res, next) => {
  try {
    await loginSchema.validate({ ...req.body });
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = loginValid;

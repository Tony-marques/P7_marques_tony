// LIBRARIES
const yup = require("yup");

// regex pour les noms et prénoms
const namesRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s'.-]+$/;

// schéma yup pour les données d'une inscription
const registerSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Le prénom est requis")
    .matches(
      namesRegex,
      "Le prénom peut contenir : majuscules, minuscules & espaces"
    )
    .min(2, "Le prénom doit contenir au minimum 2 caractères")
    .max(15, "Le prénom de peut pas dépasser 15 caractères"),

  lastname: yup
    .string()
    .trim()
    .required("Le nom est requis")
    .matches(
      namesRegex,
      "Le nom peut contenir : majuscules, minuscules & espaces"
    )
    .min(2, "Le nom doit contenir au minimum 2 caractères")
    .max(15, "Le nom de peut pas dépasser 15 caractères"),

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
const registerValid = async (req, res, next) => {
  try {
    await registerSchema.validate({ ...req.body });
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = registerValid;

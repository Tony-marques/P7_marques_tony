const yup = require("yup");

// regex pour les noms et prénoms
const namesRegex =
  /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð\s'.-]+$/;

const updateProfilSchema = yup.object().shape({
  bio: yup
    .string()
    .required("Votre bio est requise.")
    .min(5, "Un minimum de 5 caractères pour votre bio.")
    .max(150, "150 caractères maximum pour votre bio."),

  age: yup
    .number()
    .typeError("L'age doit être un chiffre")
    .required("Votre age est requis.")
    .min(16, "L'age minimum est de 16 ans.")
    .max(70, "L'age maximum est de 70 ans."),
  // .matches(/^[0-9]{2,3}$/, "test"),

  name: yup
    .string()
    .required("Votre nom est requis.")
    .matches(
      namesRegex,
      "Votre prénom peut contenir : majuscules, minuscules & espaces."
    )
    .min(2, "Un minimum de 2 lettres est nécéssaire pour votre prénom.")
    .max(20, "Votre prénom ne peut excéder 20 lettres."),

  lastname: yup
    .string()
    .required("Votre nom est requis.")
    .matches(
      namesRegex,
      "Votre nom peut contenir : majuscules, minuscules & espaces."
    )
    .min(2, "Un minimum de 2 lettres est nécéssaire pour votre nom.")
    .max(20, "Votre nom ne peut excéder 20 lettres."),
});

const updateProfilValidation = async (req, res, next) => {
  try {
    await updateProfilSchema.validate({ ...req.body });
    next();
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = updateProfilValidation;

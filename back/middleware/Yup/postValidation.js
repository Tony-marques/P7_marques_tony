const yup = require("yup");

const postSchema = yup.object().shape({
  content: yup
    .string()
    .required("Le champs est requis")
    .min(5, "Votre contenu doit faire 5 caractères minimum.")
    .max(150, "Votre contenu ne doit pas excéder 150 caractères."),
});

const postValid = async (req, res, next) => {
  console.log(req.body);
  try {
    await postSchema.validate({ ...req.body });
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = postValid;

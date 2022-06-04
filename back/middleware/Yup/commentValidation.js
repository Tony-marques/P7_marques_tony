const yup = require("yup");

const commentSchema = yup.object().shape({
  content: yup
    .string()
    .required("Un commentaire est requis")
    .min(3, "Votre commentaire doit contenir un minimum de 3 caractères"),
});

const commentValid = async (req, res, next) => {
  try {
    await commentSchema.validate({ ...req.body });
    next();
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = commentValid;

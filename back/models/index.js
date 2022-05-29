const config = require("../config/db.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({ ...config });

sequelize
  .authenticate()
  .then(() => console.log("Connecté à la BDD"))
  .catch((err) => console.log("Non connecté à la BDD"));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("./post.model")(sequelize, DataTypes);
db.user = require("./user.model")(sequelize, DataTypes);
db.comment = require("./comment.model")(sequelize, DataTypes);

// Relation post / user
db.user.hasMany(db.post, { foreignKey: "userId", onDelete: "cascade" });
db.post.belongsTo(db.user, { foreignKey: "userId" });

// Relation user / comment
db.user.hasMany(db.comment, { onDelete: "cascade" });
db.comment.belongsTo(db.user);

// Relation post / comment
db.post.hasMany(db.comment, { onDelete: "cascade" });
db.comment.belongsTo(db.post);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;

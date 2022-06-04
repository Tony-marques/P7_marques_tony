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
db.like = require("./like.model")(sequelize, DataTypes);

// Relation post / user
db.user.hasMany(db.post, { foreignKey: "userId", onDelete: "cascade" });
db.post.belongsTo(db.user, { foreignKey: "userId" });

// Relation user / comment
db.user.hasMany(db.comment, { onDelete: "cascade" });
db.comment.belongsTo(db.user);

// Relation post / comment
db.post.hasMany(db.comment, { onDelete: "cascade" });
db.comment.belongsTo(db.post);

// Relation post / like
db.post.hasMany(db.like, { onDelete: "cascade" });
db.like.belongsTo(db.post);

// Relation user / like
db.user.hasMany(db.like, { onDelete: "cascade" });
db.like.belongsTo(db.user);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("yes re-sync done!");
  })
  .catch(() => {
    console.log("No sync");
  });

module.exports = db;

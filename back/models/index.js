const config = require("../config/db.js");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({ ...config });

sequelize
  .authenticate()
  .then(() => console.log("ok"))
  .catch((err) => console.log("pas ok"));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.post = require("./post.model")(sequelize, DataTypes);
db.user = require("./user.model")(sequelize, DataTypes);

db.user.hasMany(db.post, { foreignKey: "userId", onDelete: "cascade" });
db.post.belongsTo(db.user, { foreignKey: "userId" });

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

module.exports = db;

// const mysql = require("mysql");
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("groupomania", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// sequelize
//   .authenticate()
//   .then(() => console.log("ok"))
//   .catch((err) => console.log("pas ok"));

// sequelize.sync({ force: true });

// module.exports = sequelize;


module.exports = {
  username: "root",
  password: "",
  database: "groupomania",
  host: "localhost",
  dialect: "mysql"
}
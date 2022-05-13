// const { DataTypes } = require("sequelize");

// const db = require("../config/db");

// module.exports = db.define(
//   "post",
//   {
//     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
//     author: { type: DataTypes.STRING, allowNull: false },
//     content: { type: DataTypes.STRING, allowNull: false },
//     userId: { type: DataTypes.STRING },
//   }
//   // { timestamps: true }
// );



module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define("post", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    author: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING },
  });
  return post;
};

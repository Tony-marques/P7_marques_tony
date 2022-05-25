module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define("post", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    author: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   // references: {
    //   //   model: "user",
    //   //   key: "id",
    //   // },
    // },
  });

  return post;
};

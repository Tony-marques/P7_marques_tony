module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define("post", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: true },
  });

  return post;
};

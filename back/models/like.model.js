module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define("like", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // postId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });
  return like;
};

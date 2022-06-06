module.exports = (sequelize, DataTypes) => {
  const like = sequelize.define("like", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    }
  });
  return like;
};

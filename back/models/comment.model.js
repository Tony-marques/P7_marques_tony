module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define("comment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    content: { type: DataTypes.STRING, allowNull: false },
  });

  return comment;
};

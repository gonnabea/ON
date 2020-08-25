module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define("ChatRoom", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  ChatRoom.associate = (models) => {
    ChatRoom.hasMany(models.User, { as: "participants" })
  }
  return ChatRoom
}

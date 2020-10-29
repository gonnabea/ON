module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define("ChatRoom", {
    id: {
      type: DataTypes.CHAR,

      primaryKey: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
  ChatRoom.associate = (models) => {
    ChatRoom.hasMany(models.Chat)
    ChatRoom.belongsToMany(models.User, { through: "UserChatroom", as: "users" })
  }
  return ChatRoom
}

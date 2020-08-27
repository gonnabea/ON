module.exports = (sequelize, DataTypes) => {
  const ChatRoom = sequelize.define("ChatRoom", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
  ChatRoom.associate = (models) => {
    ChatRoom.hasMany(models.Chat)
    ChatRoom.belongsToMany(models.User, { through: "UserChatroom" })
  }
  return ChatRoom
}

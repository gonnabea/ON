module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
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
  Chat.associate = (models) => {
    Chat.belongsTo(models.User)
    Chat.belongsTo(models.ChatRoom)
  }
  return Chat
}

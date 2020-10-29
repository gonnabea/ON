const { stringify } = require("uuid")

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
    },
    statusMsg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })
  User.associate = (models) => {
    User.belongsToMany(models.ChatRoom, { through: "UserChatroom", as: "chatrooms" })
    User.hasMany(models.Chat)
  }
  return User
}

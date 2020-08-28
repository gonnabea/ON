import db, { Sequelize } from "../models"
import passport from "passport"
import routes from "../routes"

export const chatController = async (req, res) => {
  // db.Chat.findAll().then(chats => res.json({chats}))
  const allChat = await db.Chat.findAll({
    include: [
      {
        model: db.User,
      },
    ],
  })
  const allUser = await db.User.findAll()

  res.send({ allChat, allUser })
}

export const postChat = async (req, res) => {
  try {
    const chat = await db.Chat.create({
      text: req.body.content,
      UserId: req.user.id,
      // ChatRoomId: req.user.id + req.body.targetUser,
    })
    res.json(chat)
  } catch (err) {
    console.log(err)
  }
}

export const chatroom = async (req, res) => {
  const { UserId } = req.body
  console.log(UserId)
  try {
    const chatroom = await db.ChatRoom.create({
      UserId,
    })
    console.log(chatroom)
    const UserChatroom = await db.ChatRoom.findAll()
    console.log(UserChatroom)
  } catch (err) {
    console.log(err)
  }
}

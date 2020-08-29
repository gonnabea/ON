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
    await db.Chat.create({
      text: req.body.content,
      UserId: req.user.id,
      ChatRoomId: req.user.id + req.body.targetID,
    })
  } catch (err) {
    console.log(err)
  }
}

export const chatroom = async (req, res) => {
  const { UserId } = req.body
  const { id } = req.user

  try {
    const loggedUser = await db.User.findOne({ where: { id } })
    const targetUser = await db.User.findOne({ where: { id: UserId } })
    console.log(targetUser)

    await db.ChatRoom.findOrCreate({
      where: { id: loggedUser.id + targetUser.id },
      defaults: {
        id: loggedUser.id + targetUser.id,
        text: loggedUser.username + "'s chatroom for" + targetUser.username,
      },
    }).then((result) => {
      const created = result[1]

      if (created) {
        result[0].addUsers(targetUser)
        result[0].addUsers(loggedUser)
      }
    })
  } catch (err) {
    console.log(err)
  }
}

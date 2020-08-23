import db, { Sequelize } from "../models"
import passport from "passport"
import routes from "../routes"

export const chatController = async (req, res) => {
  // db.Chat.findAll().then(chats => res.json({chats}))
  const all = await db.Chat.findAll({
    include: [
      {
        model: db.User,
      },
    ],
  })
  console.log(all)
  res.send(all)
}

export const postChat = async (req, res) => {
  try {
    const chat = await db.Chat.create({
      text: req.body.content,
      UserId: req.user.id,
    })
    res.json(chat)
  } catch (err) {
    console.log(err)
  }
}

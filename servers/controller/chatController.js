import db, { Sequelize } from "../models"
import passport from "passport"
import routes from "../routes"
import { Op } from "sequelize"

export const chatController = async (req, res) => {
  // db.Chat.findAll().then(chats => res.json({chats}))
  const allChat = await db.Chat.findAll({
    include: [
      {
        model: db.User,
      },
      {
        model: db.ChatRoom,
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

  return ""
}

export const chatroom = async (req, res) => {
  const { UserId } = req.body // 타겟 유저
  const { id } = req.user // 접속된 유저

  try {
    const loggedUser = await db.User.findOne({ where: { id } })
    const targetUser = await db.User.findOne({ where: { id: UserId } })

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
      res.send(result)
    })
  } catch (err) {
    console.log(err)
  }
}

export const findMsg = async (req, res) => {
  const {
    body: { targetUser },
  } = req

  const messages = await db.Chat.findAll({
    include: [
      {
        model: db.User,
      },
    ],
    where: {
      [Op.or]: [
        {
          chatRoomId: req.user.id + targetUser.id,
        },
        {
          chatRoomId: targetUser.id + req.user.id,
        },
      ],
    },
  })

  res.send(messages)
}

import db from "../models"
import { Op } from "sequelize"
import { uuid } from "uuidv4"

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
    const chatroom = await db.ChatRoom.findOrCreate({
      where: { id: loggedUser.id + targetUser.id },
      include: [
        {
          model: db.User,
          as: "users",
          attributes: ["id", "username"],
          through: {
            attributes: [],
          },
        },
      ],
      defaults: {
        id: loggedUser.id + targetUser.id,
        text: loggedUser.username + "'s chatroom for" + targetUser.username,
      },
    }).then((result) => {
      console.log("채팅룸 유저정보")
      const created = result[1]

      if (created) {
        // 새로 만들어질 시 result[1] 값이 있음
        result[0].addUsers(targetUser)
        result[0].addUsers(loggedUser)
      }
      console.log(result[0].users)
      res.send(result)
    })
    console.log("채팅룸!!!!!!!!!!!!!", chatroom)
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

export const createGroupChat = async (req, res) => {
  // 그룹 채팅방 생성
  const {
    body: { targetUsers },
  } = req // 생성자를 제외한 채팅방의 구성인원
  console.log(targetUsers)
  try {
    db.ChatRoom.create({
      id: uuid(),
    }).then((chatroom) => {
      console.log(chatroom)
      targetUsers.map(async (userId) => {
        const user = await db.User.findOne({ where: { id: userId } })
        chatroom.addUsers(user)
      }) // 체크된 유저들을 채팅방에 추가
      chatroom.addUsers(req.user) // 본인 추가
      console.log("만들어진 채팅룸", chatroom)
    })
  } catch (error) {
    console.log(error)
  }
}

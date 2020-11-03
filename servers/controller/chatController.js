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
    console.log("currentRoomID")
    console.log(req.body.currentRoomID)
    await db.Chat.create({
      text: req.body.content,
      UserId: req.user.id,
      // ChatRoomId: req.user.id + req.body.targetID,
      ChatRoomId: req.body.currentRoomID,
    })
  } catch (err) {
    console.log(err)
  }

  return ""
}

export const chatroom = async (req, res) => {
  const { UserId, currentRoomID } = req.body // 타겟 유저
  const { id } = req.user // 접속된 유저

  try {
    const loggedUser = await db.User.findOne({ where: { id } })
    const targetUser = await db.User.findOne({ where: { id: UserId } })
    const chatroom = await db.ChatRoom.findOrCreate({
      where: { id: currentRoomID },
      include: [
        {
          model: db.User,
          as: "users",
          attributes: ["id", "username", "avatar"],
          through: {
            attributes: [],
          },
        },
      ],
      defaults: {
        id: currentRoomID,
        text: `A Chatting room`,
      },
    }).then((result) => {
      console.log("채팅룸 유저정보")
      const created = result[1]

      if (created) {
        // 새로 만들어질 시 result[1] 값이 있음
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
    body: { currentRoomID },
  } = req
  console.log("테스트")
  console.log(currentRoomID)
  const messages = await db.Chat.findAll({
    include: [
      {
        model: db.User,
      },
    ],
    where: {
      chatRoomId: currentRoomID,
    },
  })

  res.send(messages)
}

export const createGroupChat = async (req, res) => {
  // 그룹 채팅방 생성
  const {
    body: { targetUsers },
  } = req // 생성자를 제외한 채팅방의 구성인원들의 id값
  let userList = []
  if (Array.isArray(targetUsers)) {
    userList = targetUsers
    // 다대다 채팅
  } else {
    userList = [targetUsers]
  } // 1:1 채팅
  userList.push(`${req.user.id}/${req.user.username}`)
  console.log(userList)
  try {
    let usernameArr = []
    userList.map(async (targetUser) => {
      console.log(targetUser)
      const username = targetUser.split("/")[1]
      usernameArr.push(username)
    })
    console.log(usernameArr)
    const usernameList = usernameArr.join()
    db.ChatRoom.create({
      id: uuid(),
      text: usernameList, // 랜덤ID 생성
    }).then(async (chatroom) => {
      userList.map(async (targetUser) => {
        const userId = targetUser.split("/")[0]
        const user = await db.User.findOne({
          where: { id: userId },
          include: [
            {
              model: db.ChatRoom,
              as: "chatrooms",
              attributes: ["id", "text"],
              through: {
                attributes: [],
              },
            },
          ],
        })
        chatroom.addUsers(user) // 내 생각에 이렇게 모델을 추가해주면 chatroom과 user 모두에게 리스트가 생기는 듯 하다
      }) // 체크된 유저들을 채팅방에 추가
      chatroom.addUsers(req.user) // 본인 추가
    })
  } catch (error) {
    console.log(error)
  }
}

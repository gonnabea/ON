import db from "../models"
import passport from "passport"
import routes from "../routes"
import { Model } from "sequelize"

export const postLogin = passport.authenticate("local", {
  successRedirect: "/success-login",
  failureRedirect: "/loginfailed",
  failureFlash: true,
}) // err 패러미터를 만들어주지 않았기 때문에 passport.js에 있는 코드에 err argument가 없었던 것이다.

export const successLogin = async (req, res) => {
  req.user.status = "active"
  await req.user.save()
  res.redirect("http://localhost:3000/#/")
}

export const userController = async (req, res) => {
  // db.Chat.findAll().then(chats => res.json({chats}))
  const all = await db.ChatRoom.findAll({
    include: [{ model: db.User }],
  })
  res.send(all)
}

export const postJoin = async (req, res) => {
  const {
    body: { username, password, password2, email },
  } = req
  if (password === password2) {
    try {
      await db.User.create({
        username,
        password,
      })
    } catch (err) {
      console.log(err)
    } finally {
      res.redirect("back")
    }
  } else {
    console.log("Passwords does not match!")
  }
}

export const logout = async (req, res) => {
  req.user.status = "inactive"
  await req.user.save()
  req.logout()
  res.redirect("back")
}

export const setting = async (req, res) => {
  console.log(`${req.user.username}: You're now in Setting`)
}

export const setStatusMsg = async (req, res) => {
  const {
    body: { text },
  } = req
  req.user.statusMsg = text
  await req.user.save()
  console.log(req.user.statusMsg)
}

// export const addFriend = (req, res) => {
//   const {
//     body: { targetUser },
//   } = req

//   const loggedUser = db.User.findOne({
//     where: { id: req.user.id },
//   })

//   const Friends = db.User.findAll()
// }

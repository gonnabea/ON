import db from "../models"
import passport from "passport"
import routes from "../routes"

export const postLogin = passport.authenticate("local", {
  successRedirect: "back",
  failureRedirect: "/loginfailed",
  failureFlash: true,
}) // err 패러미터를 만들어주지 않았기 때문에 passport.js에 있는 코드에 err argument가 없었던 것이다.

export const userController = async (req, res) => {
  // db.Chat.findAll().then(chats => res.json({chats}))
  const all = await db.User.findAll()
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
  req.logout()
  res.redirect("back")
}

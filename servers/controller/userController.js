import db from "../models"
import passport from "passport"
import routes from "../routes"

export const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/loginfailed",
})

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
    }
  } else {
    console.log("Passwords does not match!")
  }
}

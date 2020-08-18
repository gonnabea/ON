import db from "../models"
import passport from "passport"
import routes from "../routes"

export const chatController = async (req, res) => {
  // db.Chat.findAll().then(chats => res.json({chats}))
  const all = await db.Chat.findAll()

  res.send(all)
}

export const postChat = async (req, res) => {
  try {
    const chat = await db.Chat.create({
      text: req.body.content,
    })
    res.json(chat)
  } catch (err) {
    console.log(err)
  }
}

export const postLogin = () => {
  return (
    passport.authenticate("local", { failureRedirect: routes.login }),
    (req, res) => {
      res.redirect(routes.home)
    }
  )
}

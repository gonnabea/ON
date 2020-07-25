import db from "../models";

export const homeController = async(req, res) => {
    // db.Chat.findAll().then(chats => res.json({chats}))
    const all = await db.Chat.findAll();
    res.send(all)
}
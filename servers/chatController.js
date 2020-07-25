import db from "../models";

export const chatController = async(req, res) => {
    // db.Chat.findAll().then(chats => res.json({chats}))
    const all = await db.Chat.findAll();
    res.send(all)
}

export const postChat = async(req, res) => {
    const chat = await db.Chat.create({
        text: req.body.content
    })
    res.json(chat);
}
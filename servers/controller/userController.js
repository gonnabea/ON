
import db from "../models";
import passport from "passport";
import routes from "../routes";

export const postLogin = () => {
    return passport.authenticate('local', { failureRedirect: routes.login }),
   (req, res) => {
     res.redirect(routes.home);
   }
 }


 export const userController = async(req, res) => {
    // db.Chat.findAll().then(chats => res.json({chats}))
    const all = await db.User.findAll();
    res.send(all)
}

export const postJoin = (req, res) => {
    const { body: {username, password, password2} } = req;

    try{
        db.User.create({
            username,
            password
        })
    }catch(err){
        console.log(err);
    }
}
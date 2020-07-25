const HOME = "/home";
const CHAT = "/chat";
const CHATROOM = "/chatroom/:id";
const API = "/api";

const routes = {
    home: HOME,
    chat: CHAT,
    chatroom: (id) => {
        if(id) return `/chatroom/${id}`;
        else return CHATROOM;
    },
    api: API
}

export default routes;
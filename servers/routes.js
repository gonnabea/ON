const HOME = "/home";
const CHAT = "/chat";
const CHATROOM = "/chatroom/:id";
const API = "/api";
const LOGIN = "/login";
const LOGOUT = "/logout";
const JOIN = "/join";

const routes = {
    home: HOME,
    chat: CHAT,
    chatroom: (id) => {
        if(id) return `/chatroom/${id}`;
        else return CHATROOM;
    },
    api: API,
    login: LOGIN,
    logout: LOGOUT,
    join: JOIN
}

export default routes;
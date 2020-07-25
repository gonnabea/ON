const HOME = "/home";
const CHATROOM = "/chatroom/:id";
const API = "/api";

const routes = {
    home: HOME,
    chatroom: (id) => {
        if(id) return `/chatroom/${id}`;
        else return CHATROOM;
    },
    api: API
}

export default routes;
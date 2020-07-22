const HOME = "/";
const CHATROOM = "/chatroom/:id";
const API = "/api";
const SOCKETIO = "/socket.io/socket.io.js"

const routes = {
    home: HOME,
    chatroom: (id) => {
        if(id) return `/chatroom/${id}`;
        else return CHATROOM;
    },
    api: API,
    socketIO: SOCKETIO
}

export default routes;
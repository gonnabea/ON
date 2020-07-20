import { events } from "./events"

export const socketController = (socket) => {
    return socket.broadcast.emit(events.welcome, "새로운 유저가 접속하였습니다.")
}
import { events } from "./events"

export const socketController = (socket) => {
  return (
    socket.broadcast.emit(events.welcome, "새로운 유저가 접속하였습니다."),
    socket.on(events.sendMsg, (msg) => {
      socket.broadcast.emit(events.sendMsg, msg)
    })
  )
}

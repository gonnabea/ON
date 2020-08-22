import { events } from "./events"

export const socketController = (socket) => {
  let messages = []
  return (
    socket.broadcast.emit(events.welcome, "새로운 유저가 접속하였습니다."),
    socket.on(events.sendMsg, (msg) => {
      console.log(msg)
      messages.push(msg)
      socket.broadcast.emit(events.sendMsg, messages)
    })
  )
}

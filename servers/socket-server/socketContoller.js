import { events } from "./events"

export const socketController = (socket) => {
  return (
    socket.on(events.welcome, ({msg,roomID, roomID2}) => {
      // 클라이언트에서 보낸 welcome 소켓 리스닝
      console.log(`룸 ID: ${roomID}`)
      socket.broadcast.emit(events.welcome, msg) // 송신자 제외 모든 클라이언트에게 접속메세지 전송
      socket.join([roomID,roomID2])
      
    }),
    socket.on(events.sendMsg, ({newMessage, roomID,roomID2}) => {
      // 클라이언트에서 보낸 채팅메세지 소켓 리스닝
      console.log(`룸 ID: ${roomID}`)
      socket.in(roomID).in(roomID2).emit(events.sendMsg, newMessage) // 송신자 제외 모든 클라이언트에게 채팅메세지 전송
      
    }),
    socket.on(events.disconnect, () => {
      socket.disconnect(true)
    })
  )
}

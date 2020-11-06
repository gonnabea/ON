import { events } from "./events"

export const socketController = (socket) => {
  return (
    socket.on(events.welcome, ({ msg, roomID }) => {
      // 클라이언트에서 보낸 welcome 소켓 리스닝
      console.log(`룸 ID: ${roomID}`)
      socket.broadcast.emit(events.welcome, msg) // 송신자 제외 모든 클라이언트에게 접속메세지 전송
      socket.join([roomID])
    }),
    socket.on(events.sendMsg, ({ newMessage, roomID }) => {
      // 클라이언트에서 보낸 채팅메세지 소켓 리스닝
      console.log(`룸 ID: ${roomID}`)
      socket.in(roomID).emit(events.sendMsg, newMessage) // 송신자 제외 채팅방 내의 클라이언트에게 채팅메세지 전송
    }),
    socket.on(events.leaveRoom, ({ roomID }) => {
      // 채팅방 퇴장 시 채널 제거
      // console.log("소켓 룸 리스트:")
      // console.log(socket.adapter.rooms) // 모든 채팅방 목록 보여주기 참고: https://stackoverflow.com/questions/6631501/how-to-list-rooms-on-socket-io-nodejs-server

      socket.leave(roomID)
    })
  )
}

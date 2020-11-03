import axios from "axios"

const api = {
  getLoggedUser: () => axios.get("currentUser"),
  getAllUsers: () => axios.get("getAllUsers"),
  setStatusMsg: (text) =>
    axios({
      method: "post",
      url: "setStatusMsg",
      data: {
        text,
      },
    }),
  sendMsg: (content, currentRoomID) =>
    axios({
      method: "post",
      url: `chat`,
      timeout: 500,
      data: {
        content,
        currentRoomID,
      },
    }), // 메세지를 백엔드 DB에 저장 요청
  findChatroom: (UserId, currentRoomID) =>
    axios({
      method: "post",
      url: "chatroom",
      data: {
        UserId,
        currentRoomID,
      },
    }),
  getOriginMsg: (currentRoomID) =>
    axios({
      method: "post",
      url: "find-chat",
      data: {
        currentRoomID,
      },
    }),
  getChatroomList: () => axios.get("chatroom-list"),
}

export default api

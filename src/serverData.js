import axios from "axios"

export const api = {
  getLoggedUser: () => axios.get("currentUser"),
}

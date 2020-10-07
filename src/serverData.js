import axios from "axios"

export const api = {
  getLoggedUser: () => axios.get("currentUser").then((result) => result.data),
}

import axios from "axios"

const serverData = axios.create({
  baseURL: "api",
})

const userApi = {
  user: () => {},
}

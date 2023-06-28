import axios from "axios"
import { REACT_APP_API_KEY  } from "../env.ts";

const key = REACT_APP_API_KEY

console.log(key)

const api = axios.create({
    baseURL: "https://ayasono.cn",
    timeout: 1000 * 10,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + key,
    }
})

export default api

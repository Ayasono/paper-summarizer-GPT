import axios from "axios"

const key = import.meta.env.VITE_REACT_APP_API_KEY
const baseURL = import.meta.env.VITE_REACT_APP_API_BASE_URL

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + key,
    }
})

export default api

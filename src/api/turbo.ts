import request from "./index.ts";

const url = import.meta.env.VITE_REACT_APP_API_URL

export const getTurbo = (max_tokens=2000, messages: []) => {
    return request({
        url,
        method: "post",
        data: {
            "frequency_penalty": 1,
            "presence_penalty": 1,
            "max_tokens": max_tokens,
            "model": "gpt-3.5-turbo-16k",
            "temperature": 1,
            messages
        }
    })
}


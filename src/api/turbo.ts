import request from "./index.ts";

export const getTurbo = (max_tokens=2000, messages: []) => {
    return request({
        url: "/v1/chat/completions",
        method: "post",
        data: {
            "frequency_penalty": 1,
            "presence_penalty": 1,
            "max_tokens": max_tokens,
            "model": "gpt-3.5-turbo-0301",
            "temperature": 1,
            messages
        }
    })
}


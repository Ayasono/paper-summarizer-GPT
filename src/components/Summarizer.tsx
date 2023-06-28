import {useEffect, useState} from "react";
import {Button} from "antd";
import {getTurbo} from "../api/turbo.ts";

export const Summarizer = ({pdfStr}) => {
    const message = `please summarize the following text with academic paper format: ${pdfStr}`;
    const [max_tokens, setMax_tokens] = useState(500);
    const [messages, setMessages] = useState([]); // multiple conversations
    const [summarizedMessages, setSummarizedMessages] = useState([]); // single conversation

    const [conversations, setConversations] = useState([{role: "user", content: message}]);
    const useGPT = async () => {
        const res = await getTurbo(max_tokens, conversations);
        setSummarizedMessages(res.data.choices[0].message.content);
        setMessages([summarizedMessages, ...messages])
    }

    useEffect(() => {
        console.log(pdfStr)
        setConversations([{role: "user", content: pdfStr}])
    }, [pdfStr]);

    return (
        <div>
            <Button onClick={useGPT}>Summarize with GPT</Button>
            <p>{summarizedMessages}</p>
        </div>
    )
}

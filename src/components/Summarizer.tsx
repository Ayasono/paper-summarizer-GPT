import {useEffect, useState} from "react";
import {Button} from "antd";
import {getTurbo} from "../api/turbo.ts";

export const Summarizer = ({pdfStr}) => {
    const [max_tokens, setMax_tokens] = useState(1000);
    let prompt = `please summarize the following paper precisely in english, do not misunderstand to translate the paper: ${pdfStr}`.slice(0, 4000 * 4 - max_tokens) ;
    const [messages, setMessages] = useState([]); // multiple conversations
    const [summarizedMessages, setSummarizedMessages] = useState([]); // single conversation
    const [conversations, setConversations] = useState([{role: "user", content: prompt}]);

    const useGPT = async () => {
        setConversations([{role: "user", content: prompt}])
    }

    useEffect( () => {
        if (!pdfStr) return;
        const fetchData = async () => {
            console.log(prompt.length)

            const res = await getTurbo(max_tokens, conversations);

            if (res.data.error_code) {
                console.log(res);
                setSummarizedMessages([...summarizedMessages,res.data.msg])
            } else {
                setSummarizedMessages([res.data.data.message])
                setMessages([summarizedMessages, ...messages])
            }
        }

        fetchData();
    }, [conversations]);

    return pdfStr && (
        <div>
            <Button onClick={useGPT}>Summarize with GPT</Button>
            <div>{summarizedMessages && summarizedMessages.map((summarizedMessage) => (
                <div className={"whitespace-pre-line"} key={Math.random()}>
                    <p>{summarizedMessage}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
